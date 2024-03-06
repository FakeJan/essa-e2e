from playwright.sync_api import Playwright, expect

def test_prvi(playwright: Playwright) -> None:
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()

    page.goto('https://dev-editor.true-bar.si/')
    
    page.get_by_placeholder("Uporabniško ime").click()
    page.get_by_placeholder("Uporabniško ime").fill("essa")
    page.get_by_placeholder("Geslo").click()
    page.get_by_placeholder("Geslo").fill("test123")

    page.get_by_role("button", name="PRIJAVA").click()

    logout_button = page.get_by_role("button", name="ODJAVA")

    page.locator("form button").first.click()

    page.get_by_role("button", name="NALOŽI").click()

    alert_locator = page.get_by_role("alert")
    alert_text = 'Za nalaganje nimate dovoljenja.'

    assert alert_locator.inner_text() == alert_text
    
    page.locator('role=button').nth(3).click()
    logout_button.click()
    
    browser.close()