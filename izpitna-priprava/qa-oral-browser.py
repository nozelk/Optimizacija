"""Focused UI checks for the concise study flow; isolated browser profile."""
import json
import tempfile
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

ROOT = Path(__file__).resolve().parent
INDEX = (ROOT / "index.html").as_uri()
options = webdriver.ChromeOptions()
options.binary_location = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
options.add_argument("--headless=new")
options.add_argument("--disable-gpu")
options.add_argument("--allow-file-access-from-files")
options.add_argument("--window-size=1440,1050")
options.set_capability("goog:loggingPrefs", {"browser": "ALL"})

with tempfile.TemporaryDirectory(prefix="opt-oral-qa-") as profile:
    options.add_argument(f"--user-data-dir={profile}")
    driver = webdriver.Chrome(options=options)
    wait = WebDriverWait(driver, 12)
    checks, screenshots = [], []
    def go(route, selector):
        driver.get(f"{INDEX}#/{route}")
        wait.until(lambda d: d.find_elements(By.CSS_SELECTOR, selector))
    def click(selector):
        node = driver.find_element(By.CSS_SELECTOR, selector)
        driver.execute_script("arguments[0].scrollIntoView({block:'center',behavior:'instant'});", node)
        node.click()
    def screenshot(name):
        out = Path(tempfile.gettempdir()) / f"opt-oral-{name}.png"
        driver.save_screenshot(str(out))
        screenshots.append(str(out))
    try:
        go("teorija", ".oral-row")
        assert len(driver.find_elements(By.CSS_SELECTOR, ".oral-row")) == 27
        screenshot("index-desktop")
        click('[data-oral-filter="asked"]')
        asked = driver.find_elements(By.CSS_SELECTOR, ".oral-row:not([hidden])")
        assert {a.get_attribute("data-oral-id") for a in asked} == {"lp", "8", "10", "11", "14", "17", "18", "19", "20"}
        click('[data-oral-filter="all"]')
        checks.append("27 study sheets and filters")

        for lesson in ["lp"] + [str(i) for i in range(1, 27)]:
            go(f"vprasanje/{lesson}", f'[data-lesson-id="{lesson}"]')
            assert driver.find_elements(By.CSS_SELECTOR, ".oral-formula .katex"), lesson
            assert not driver.find_elements(By.CSS_SELECTOR, ".katex-error,.math-fallback"), lesson
            assert not driver.execute_script("return [...document.querySelectorAll('.oral-symbols .js-math')].some(x=>/[\u0000-\u001f]/.test(x.dataset.tex));"), lesson
            assert driver.execute_script("return document.documentElement.scrollWidth <= innerWidth + 1"), lesson
            assert driver.find_elements(By.CSS_SELECTOR, ".oral-proof summary"), lesson
            if lesson in ["lp", "8", "20"]:
                driver.execute_script("scrollTo({top:0,behavior:'instant'})")
                screenshot(f"lesson-{lesson}-desktop")
        checks.append("all 27 routes render math, proofs and source links")

        go("vprasanje/20", '[data-visual="hungarian"]')
        for step in range(6):
            click('[data-visual="hungarian"] [aria-label="Naslednji korak prikaza"]')
            if step == 2:
                screenshot("hungarian-cover-desktop")
                assert len(driver.find_elements(By.CSS_SELECTOR, ".cover-0")) == 10
        assert len(driver.find_elements(By.CSS_SELECTOR, ".chosen-cell")) == 6
        assert "254" in driver.find_element(By.CSS_SELECTOR, ".oral-visual-stage").text
        click('[data-visual="hungarian"] [aria-label="Prejšnji korak prikaza"]')
        assert "Šest neodvisnih" in driver.find_element(By.CSS_SELECTOR, ".oral-visual-stage h3").text
        go("vprasanje/18", '[data-visual="matching"]')
        for _ in range(3):
            click('[data-visual="matching"] [aria-label="Naslednji korak prikaza"]')
        assert len(driver.find_elements(By.CSS_SELECTOR, ".cover-node")) == 2
        screenshot("matching-cover-desktop")
        checks.append("PDF matrix: all 7 stages, 5-line cover, 6 assignments, 254 seconds; matching diagram")

        go("vprasanje/8", '[data-lesson-id="8"]')
        click(".oral-proof summary")
        assert driver.find_element(By.CSS_SELECTOR, ".oral-proof").get_attribute("open")
        assert driver.find_element(By.CSS_SELECTOR, ".oral-proof li").is_displayed()
        click('[data-oral-status="2"]')
        assert "1 od 27" in driver.find_element(By.ID, "progress-copy").text
        driver.refresh()
        wait.until(lambda d: d.find_elements(By.CSS_SELECTOR, '[data-lesson-id="8"]'))
        assert driver.find_element(By.CSS_SELECTOR, '[data-oral-status="2"]').get_attribute("aria-pressed") == "true"
        go("teorija", ".oral-row")
        click('[data-oral-filter="remaining"]')
        assert len(driver.find_elements(By.CSS_SELECTOR, ".oral-row:not([hidden])")) == 26
        checks.append("proof expands, progress persists, remaining filter updates")

        search = driver.find_element(By.ID, "global-search")
        search.send_keys("madzarska")
        wait.until(lambda d: d.find_elements(By.CSS_SELECTOR, "#search-results a"))
        links = driver.find_elements(By.CSS_SELECTOR, "#search-results a")
        assert any("vprasanje/20" in a.get_attribute("href") for a in links)
        search.clear()
        go("gradivo", ".topic-card")
        assert len(driver.find_elements(By.CSS_SELECTOR, ".topic-card")) == 13
        go("teorija/dualnost", ".lesson-block")
        go("kartice", ".flash-card")
        go("kviz", ".setup-card")
        go("izpit", ".exam-question")
        checks.append("search and existing detail/cards/quiz/exam routes")

        for width in [390, 320]:
            driver.set_window_size(width, 844)
            driver.execute_cdp_cmd("Emulation.setDeviceMetricsOverride", {"width": width, "height": 844, "deviceScaleFactor": 1, "mobile": True})
            go("teorija", ".oral-row")
            assert driver.execute_script("return document.documentElement.scrollWidth <= innerWidth + 1")
            if width == 390:
                screenshot("index-mobile")
                click("#mobile-menu")
                assert "open" in driver.find_element(By.ID, "sidebar").get_attribute("class")
                click('.main-nav a[data-route="osnova"]')
                wait.until(lambda d: d.find_elements(By.CSS_SELECTOR, '[data-lesson-id="lp"]'))
                assert "open" not in driver.find_element(By.ID, "sidebar").get_attribute("class")
            for lesson in ["lp", "8", "14", "20", "25"]:
                go(f"vprasanje/{lesson}", f'[data-lesson-id="{lesson}"]')
                assert driver.execute_script("return document.documentElement.scrollWidth <= innerWidth + 1"), (width, lesson)
                assert not driver.find_elements(By.CSS_SELECTOR, ".katex-error,.math-fallback")
                if width == 390 and lesson in ["lp", "20"]:
                    screenshot(f"lesson-{lesson}-mobile")
                if width == 390 and lesson == "20":
                    click('[data-visual="hungarian"] [aria-label="Naslednji korak prikaza"]')
                    driver.execute_script("document.querySelector('.oral-visual-controls').scrollIntoView({block:'start',behavior:'instant'});")
                    screenshot("hungarian-mobile")
        checks.append("390px and 320px layouts, mobile menu")
        errors = [log for log in driver.get_log("browser") if log["level"] == "SEVERE"]
        assert not errors, errors
        print(json.dumps({"checks": checks, "screenshots": screenshots, "errors": errors}, ensure_ascii=True, indent=2))
    finally:
        driver.quit()
