"""End-to-end smoke test. Run with: python qa-browser.py"""

from __future__ import annotations

import json
import tempfile
import time
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select, WebDriverWait


ROOT = Path(__file__).resolve().parent
INDEX = (ROOT / "index.html").as_uri()
CHROME = Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe")


def wait_for(driver: webdriver.Chrome, predicate, timeout: int = 12):
    return WebDriverWait(driver, timeout).until(predicate)


def main() -> None:
    with tempfile.TemporaryDirectory(prefix="opt-browser-qa-") as temp_dir:
        temp = Path(temp_dir)
        options = webdriver.ChromeOptions()
        options.binary_location = str(CHROME)
        options.add_argument("--headless=new")
        options.add_argument("--disable-gpu")
        options.add_argument("--no-sandbox")
        options.add_argument("--allow-file-access-from-files")
        options.add_argument("--window-size=1440,1100")
        options.set_capability("goog:loggingPrefs", {"browser": "ALL"})
        options.add_experimental_option(
            "prefs",
            {
                "download.default_directory": str(temp),
                "download.prompt_for_download": False,
                "download.directory_upgrade": True,
            },
        )

        driver = webdriver.Chrome(options=options)
        driver.set_page_load_timeout(20)
        checks: list[str] = []

        try:
            driver.get(f"{INDEX}#/domov")
            driver.execute_script("localStorage.clear();")
            driver.refresh()
            wait_for(driver, lambda d: len(d.find_elements(By.CSS_SELECTOR, ".oral-row")) == 27)
            checks.append("home: 26 izpitnih vprašanj in osnova LP")

            driver.get(f"{INDEX}#/pregled-8h")
            wait_for(driver, lambda d: len(d.find_elements(By.CSS_SELECTOR, ".review-method")) == 14)
            wait_for(driver, lambda d: len(d.find_elements(By.CSS_SELECTOR, ".review-method .katex")) >= 100)
            assert len(driver.find_elements(By.CSS_SELECTOR, ".review-example")) == 28
            assert len(driver.find_elements(By.CSS_SELECTOR, ".review-spoken")) == 14
            assert len(driver.find_elements(By.CSS_SELECTOR, ".review-anatomy article")) == 56
            assert len(driver.find_elements(By.CSS_SELECTOR, ".review-visual")) == 14
            assert len(driver.find_elements(By.CSS_SELECTOR, ".review-visual-stage")) == 14
            assert len(driver.find_elements(By.CSS_SELECTOR, ".review-visual-formulas article")) >= 28
            assert len(driver.find_elements(By.CSS_SELECTOR, ".review-question")) == 1
            assert len(driver.find_elements(By.CSS_SELECTOR, ".review-question-spoken p")) >= 4
            assert len(driver.find_elements(By.CSS_SELECTOR, ".review-notation-item")) >= 50
            assert len(driver.find_elements(By.CSS_SELECTOR, ".review-deep-link")) == 14
            lp_spoken = driver.find_element(
                By.CSS_SELECTOR, '[data-review-method="lp-model"] .review-spoken-answer'
            ).text
            lp_spoken_compact = "".join(lp_spoken.lower().split())
            assert all(token in lp_spoken_compact for token in ["matrikaa", "vektorx", "vektorb", "vektorc"]), lp_spoken
            assert "nerešujemosamolinearnegasistema" in lp_spoken_compact, lp_spoken
            lp_visual_ok = driver.execute_script(
                """
                const visual = window.REVIEW_8H.methods.find(method => method.id === 'lp-model').visual;
                return visual.formulas.length >= 4
                  && visual.formulas.some(item => item.tex.includes('a_{ij}'))
                  && visual.formulas.some(item => item.tex.includes('c_1x_1'));
                """
            )
            assert lp_visual_ok
            lp_toggle = driver.find_element(
                By.CSS_SELECTOR, '[data-review-method="lp-model"] [data-action="review-toggle-answer"]'
            )
            driver.execute_script("arguments[0].click();", lp_toggle)
            wait_for(driver, lambda d: "answer-hidden" in d.find_element(By.CSS_SELECTOR, '[data-review-method="lp-model"] .review-spoken').get_attribute("class"))
            assert not driver.find_element(By.ID, "spoken-answer-lp-model").is_displayed()
            driver.execute_script("arguments[0].click();", lp_toggle)
            wait_for(driver, lambda d: "answer-hidden" not in d.find_element(By.CSS_SELECTOR, '[data-review-method="lp-model"] .review-spoken').get_attribute("class"))
            notation_overflow = driver.execute_script(
                "return [...document.querySelectorAll('.review-notation-item dt')].filter(el => el.scrollWidth > el.clientWidth + 1).length"
            )
            assert notation_overflow == 0, notation_overflow
            assert not driver.find_elements(By.CSS_SELECTOR, ".review-method .math-fallback")
            assert not driver.find_elements(By.CSS_SELECTOR, ".review-method .equation")
            legacy_subsup = driver.execute_script(
                "return [...document.querySelectorAll('.review-method sub,.review-method sup')]"
                ".filter(el => !el.closest('.review-visual-stage')).length"
            )
            assert legacy_subsup == 0
            question_formula_overflow = driver.execute_script(
                "return [...document.querySelectorAll('.review-question-formulas .math-panel')].filter(el => el.scrollWidth > el.clientWidth + 1).length"
            )
            assert question_formula_overflow == 0, question_formula_overflow
            assert driver.execute_script(
                "return window.STUDY_DATA.examQuestions.some(q => q.id === 'e-review-oral')"
            )
            question = driver.find_element(By.ID, "review-question")
            driver.execute_script(
                "document.documentElement.style.scrollBehavior='auto'; "
                "window.scrollTo(0, arguments[0].getBoundingClientRect().top + window.scrollY - 80);",
                question,
            )
            time.sleep(0.25)
            review_screenshot = Path(tempfile.gettempdir()) / "opt-browser-qa-review-desktop.png"
            driver.save_screenshot(str(review_screenshot))
            first_method = driver.find_element(By.CSS_SELECTOR, '[data-review-method="lp-model"] .review-spoken')
            driver.execute_script(
                "window.scrollTo(0, arguments[0].getBoundingClientRect().top + window.scrollY - 80);",
                first_method,
            )
            time.sleep(0.25)
            review_method_screenshot = Path(tempfile.gettempdir()) / "opt-browser-qa-review-method.png"
            driver.save_screenshot(str(review_method_screenshot))
            lp_visual = driver.find_element(By.CSS_SELECTOR, '[data-review-method="lp-model"] .review-visual')
            driver.execute_script(
                "window.scrollTo(0, arguments[0].getBoundingClientRect().top + window.scrollY - 80);",
                lp_visual,
            )
            time.sleep(0.25)
            review_visual_screenshot = Path(tempfile.gettempdir()) / "opt-browser-qa-review-visual.png"
            driver.save_screenshot(str(review_visual_screenshot))
            network_visual = driver.find_element(By.CSS_SELECTOR, '[data-review-method="madzarska-utezi"] .review-visual')
            driver.execute_script(
                "window.scrollTo(0, arguments[0].getBoundingClientRect().top + window.scrollY - 80);",
                network_visual,
            )
            time.sleep(0.25)
            review_network_screenshot = Path(tempfile.gettempdir()) / "opt-browser-qa-review-network.png"
            driver.save_screenshot(str(review_network_screenshot))
            graph_visual = driver.find_element(By.CSS_SELECTOR, '[data-review-method="floyd-warshall"] .review-visual')
            driver.execute_script(
                "window.scrollTo(0, arguments[0].getBoundingClientRect().top + window.scrollY - 80);",
                graph_visual,
            )
            time.sleep(0.25)
            review_graph_screenshot = Path(tempfile.gettempdir()) / "opt-browser-qa-review-graph.png"
            driver.save_screenshot(str(review_graph_screenshot))
            checks.append("8h pregled: 14 govorjenih odgovorov, 14 diagramov, 28 primerov in sestavljeno vprašanje")

            driver.get(f"{INDEX}#/teorija/simpleks")
            wait_for(driver, lambda d: len(d.find_elements(By.CSS_SELECTOR, ".katex")) >= 20)
            assert not driver.find_elements(By.CSS_SELECTOR, ".equation")
            dictionary = driver.find_element(
                By.CSS_SELECTOR,
                '.js-math[data-tex*="x_{B_i}"]',
            )
            dictionary_tex = dictionary.get_attribute("data-tex")
            assert "\\sum_{j\\in N}a_{ij}'x_j" in dictionary_tex, dictionary_tex
            assert "z&=v+\\sum_{j\\in N}c_j'x_j" in dictionary_tex, dictionary_tex
            assert "\\boxed" not in dictionary_tex
            driver.execute_script(
                "document.documentElement.style.scrollBehavior='auto'; "
                "window.scrollTo(0, arguments[0].getBoundingClientRect().top + window.scrollY - 190);",
                dictionary,
            )
            time.sleep(0.25)
            formula_screenshot = Path(tempfile.gettempdir()) / "opt-browser-qa-simpleks-formula.png"
            driver.save_screenshot(str(formula_screenshot))
            checks.append("simpleks: pravilen slovar iz gradiva, brez starega HTML zapisa")

            driver.get(f"{INDEX}#/teorija/dualnost")
            wait_for(driver, lambda d: len(d.find_elements(By.CSS_SELECTOR, ".katex")) >= 20)
            assert len(driver.find_elements(By.CSS_SELECTOR, '.lesson-block[data-type="notation"]')) == 1
            proofs = driver.find_elements(By.CSS_SELECTOR, '.lesson-block[data-type="proof"]')
            assert len(proofs) == 3
            assert all(proof.find_elements(By.CSS_SELECTOR, ".proof-step") for proof in proofs)
            assert all(
                len(proof.find_elements(By.CSS_SELECTOR, ".proof-step"))
                == len(proof.find_elements(By.CSS_SELECTOR, ".proof-reason"))
                for proof in proofs
            )
            assert all(proof.find_elements(By.CSS_SELECTOR, ".source-note") for proof in proofs)
            assert not driver.find_elements(By.CSS_SELECTOR, ".math-fallback")
            blocks = driver.find_elements(By.CSS_SELECTOR, ".lesson-block")
            assert blocks[-1].get_attribute("data-type") == "recap"
            driver.execute_script("document.documentElement.style.scrollBehavior='auto'; window.scrollTo(0, arguments[0].getBoundingClientRect().top + window.scrollY - 84);", proofs[0])
            time.sleep(0.25)
            desktop_screenshot = Path(tempfile.gettempdir()) / "opt-browser-qa-desktop-proof.png"
            driver.save_screenshot(str(desktop_screenshot))
            checks.append("theory: KaTeX, legenda, 3 dokazi, viri, recap")

            driver.get(f"{INDEX}#/kartice")
            card = wait_for(driver, lambda d: d.find_element(By.CSS_SELECTOR, ".flash-card"))
            wait_for(driver, lambda d: len(d.find_elements(By.CSS_SELECTOR, ".flash-card .katex")) >= 1)
            card.click()
            wait_for(driver, lambda d: "flipped" in d.find_element(By.CSS_SELECTOR, ".flash-card").get_attribute("class"))
            checks.append("flashcards: obračanje deluje")

            driver.get(f"{INDEX}#/kviz")
            wait_for(driver, lambda d: d.find_element(By.CSS_SELECTOR, '[data-action="quiz-start"]'))
            Select(driver.find_element(By.ID, "quiz-count")).select_by_value("5")
            driver.find_element(By.CSS_SELECTOR, '[data-action="quiz-start"]').click()
            wait_for(driver, lambda d: len(d.find_elements(By.CSS_SELECTOR, ".option-button")) == 4)
            driver.find_elements(By.CSS_SELECTOR, ".option-button")[0].click()
            wait_for(driver, lambda d: d.find_element(By.CSS_SELECTOR, ".quiz-explanation"))
            checks.append("quiz: 4 možnosti in takojšnja razlaga")

            driver.get(f"{INDEX}#/izpit")
            wait_for(driver, lambda d: len(d.find_elements(By.CSS_SELECTOR, ".exam-question")) == 4)
            original_id = driver.find_element(By.CSS_SELECTOR, ".exam-head .eyebrow").text
            editors = driver.find_elements(By.CSS_SELECTOR, ".answer-editor")
            editors[0].click()
            editors[0].send_keys("Moj odgovor za avtomatski pregled.")
            wait_for(driver, lambda d: "Moj odgovor" in d.find_elements(By.CSS_SELECTOR, ".answer-editor")[0].text)
            driver.get(f"{INDEX}#/domov")
            driver.get(f"{INDEX}#/izpit")
            wait_for(driver, lambda d: "Moj odgovor" in d.find_elements(By.CSS_SELECTOR, ".answer-editor")[0].text)
            driver.find_element(By.CSS_SELECTOR, '[data-action="exam-export"]').click()
            wait_for(driver, lambda _d: bool(list(temp.glob("opt-*-odgovori.md"))))
            markdown = next(temp.glob("opt-*-odgovori.md")).read_text(encoding="utf-8")
            assert "Moj odgovor za avtomatski pregled." in markdown
            assert "Navodilo za AI pregled" in markdown
            driver.find_element(By.CSS_SELECTOR, '[data-action="exam-new"]').click()
            wait_for(
                driver,
                lambda d: d.find_element(By.CSS_SELECTOR, ".exam-head .eyebrow").text != original_id,
            )
            labels = [
                item.text.split(" · ", 1)[1]
                for item in driver.find_elements(By.CSS_SELECTOR, ".exam-question-label span:first-child")
            ]
            assert len(labels) == len(set(labels)) == 4
            checks.append("exam: 4 različne teme, autosave, nov izpit, MD izvoz")

            driver.set_window_size(390, 844)
            driver.execute_cdp_cmd(
                "Emulation.setDeviceMetricsOverride",
                {"width": 390, "height": 844, "deviceScaleFactor": 1, "mobile": True},
            )
            driver.get(f"{INDEX}#/teorija/pretoki")
            wait_for(driver, lambda d: len(d.find_elements(By.CSS_SELECTOR, ".katex")) >= 20)
            mobile_viewport = driver.execute_script(
                "return {width: window.innerWidth, height: window.innerHeight, "
                "clientWidth: document.documentElement.clientWidth, "
                "visualWidth: Math.round(window.visualViewport.width)}"
            )
            assert mobile_viewport["clientWidth"] == 390, mobile_viewport
            assert mobile_viewport["visualWidth"] == 390, mobile_viewport
            driver.find_element(By.ID, "mobile-menu").click()
            wait_for(driver, lambda d: "open" in d.find_element(By.ID, "sidebar").get_attribute("class"))
            driver.find_element(By.ID, "sidebar-scrim").click()
            first_proof = driver.find_element(By.CSS_SELECTOR, '.lesson-block[data-type="proof"]')
            driver.execute_script("document.querySelector('#toast')?.classList.remove('show');")
            driver.execute_script("document.documentElement.style.scrollBehavior='auto'; window.scrollTo(0, arguments[0].getBoundingClientRect().top + window.scrollY - 70);", first_proof)
            time.sleep(0.25)
            mobile_scrollables = driver.execute_script(
                """
                return [...document.querySelectorAll('.lesson-block[data-type="proof"] *')]
                  .filter(el => {
                    const s = getComputedStyle(el);
                    const r = el.getBoundingClientRect();
                    return r.bottom > 0 && r.top < innerHeight && el.scrollHeight > el.clientHeight + 1 && ['auto','scroll'].includes(s.overflowY);
                  })
                  .map(el => ({tag: el.tagName, cls: el.className || '', clientHeight: el.clientHeight, scrollHeight: el.scrollHeight, overflowX: getComputedStyle(el).overflowX, overflowY: getComputedStyle(el).overflowY, text: el.textContent.trim().slice(0, 90)}));
                """
            )
            overflow = driver.execute_script(
                "return document.documentElement.scrollWidth - document.documentElement.clientWidth"
            )
            if overflow > 1:
                layout = driver.execute_script(
                    """
                    const pick = selector => {
                      const el = document.querySelector(selector);
                      if (!el) return null;
                      const r = el.getBoundingClientRect();
                      return {left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), scrollWidth: el.scrollWidth, minWidth: getComputedStyle(el).minWidth, maxWidth: getComputedStyle(el).maxWidth};
                    };
                    return {innerWidth, clientWidth: document.documentElement.clientWidth, rootScroll: document.documentElement.scrollWidth, bodyScroll: document.body.scrollWidth, view: pick('#view'), shell: pick('.page-shell'), hero: pick('.topic-hero'), layout: pick('.topic-layout'), content: pick('.topic-content'), toc: pick('.local-toc'), block: pick('.lesson-block'), topbar: pick('.topbar')};
                    """
                )
                offenders = driver.execute_script(
                    """
                    return [...document.querySelectorAll('body *')]
                      .map(el => {
                        const r = el.getBoundingClientRect();
                        const host = el.closest('.math-panel,.proof-step,.notation-item,.theorem-card,.definition,.lesson-block');
                        const hr = host ? host.getBoundingClientRect() : null;
                        return {tag: el.tagName, cls: el.className || '', left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), scrollWidth: el.scrollWidth, host: host ? host.className : '', hostLeft: hr ? Math.round(hr.left) : null, hostRight: hr ? Math.round(hr.right) : null, hostWidth: hr ? Math.round(hr.width) : null, hostOverflow: host ? getComputedStyle(host).overflowX : '', hostText: host ? host.textContent.trim().slice(0, 90) : ''};
                      })
                      .filter(x => x.right > document.documentElement.clientWidth + 1 || x.left < -1)
                      .sort((a, b) => b.right - a.right)
                      .slice(0, 12);
                    """
                )
                raise AssertionError(f"horizontal overflow: {overflow}px; layout={layout}; offenders={offenders}")
            mobile_screenshot = Path(tempfile.gettempdir()) / "opt-browser-qa-mobile-proof.png"
            driver.save_screenshot(str(mobile_screenshot))
            checks.append("mobile: meni, matematični bloki in brez stranskega overflowa")

            driver.get(f"{INDEX}#/pregled-8h")
            wait_for(driver, lambda d: len(d.find_elements(By.CSS_SELECTOR, ".review-method")) == 14)
            wait_for(driver, lambda d: len(d.find_elements(By.CSS_SELECTOR, ".review-method .katex")) >= 100)
            review_overflow = driver.execute_script(
                "return document.documentElement.scrollWidth - document.documentElement.clientWidth"
            )
            if review_overflow > 1:
                review_offenders = driver.execute_script(
                    """
                    return [...document.querySelectorAll('body *')]
                      .map(el => {
                        const r = el.getBoundingClientRect();
                        return {tag: el.tagName, cls: el.className || '', left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), scrollWidth: el.scrollWidth};
                      })
                      .filter(x => x.right > document.documentElement.clientWidth + 1 || x.left < -1)
                      .sort((a, b) => b.right - a.right)
                      .slice(0, 12);
                    """
                )
                raise AssertionError(
                    f"review horizontal overflow: {review_overflow}px; offenders={review_offenders}"
                )
            visual_stage_overflow = driver.execute_script(
                "return [...document.querySelectorAll('.review-visual-stage')].filter(el => el.scrollWidth > el.clientWidth + 1).length"
            )
            assert visual_stage_overflow == 0, visual_stage_overflow
            first_review_method = driver.find_element(
                By.CSS_SELECTOR, '[data-review-method="lp-model"] .review-visual'
            )
            driver.execute_script(
                "document.documentElement.style.scrollBehavior='auto'; "
                "window.scrollTo(0, arguments[0].getBoundingClientRect().top + window.scrollY - 70);",
                first_review_method,
            )
            time.sleep(0.25)
            review_mobile_screenshot = Path(tempfile.gettempdir()) / "opt-browser-qa-review-mobile.png"
            driver.save_screenshot(str(review_mobile_screenshot))
            checks.append("8h vizualni prikaz mobile: berljiv in brez stranskega overflowa")

            severe_logs = [
                item
                for item in driver.get_log("browser")
                if item.get("level") == "SEVERE"
            ]
            assert not severe_logs, severe_logs
            checks.append("browser console: brez napak")

            print(json.dumps({
                "checks": checks,
                "formula_screenshot": str(formula_screenshot),
                "desktop_screenshot": str(desktop_screenshot),
                "mobile_screenshot": str(mobile_screenshot),
                "review_screenshot": str(review_screenshot),
                "review_method_screenshot": str(review_method_screenshot),
                "review_visual_screenshot": str(review_visual_screenshot),
                "review_network_screenshot": str(review_network_screenshot),
                "review_graph_screenshot": str(review_graph_screenshot),
                "review_mobile_screenshot": str(review_mobile_screenshot),
                "mobile_viewport": mobile_viewport,
                "mobile_scrollables": mobile_scrollables,
            }, ensure_ascii=False, indent=2))
        finally:
            driver.quit()


if __name__ == "__main__":
    main()
