require('chromedriver');
const { Builder, By, Key, until } = require('selenium-webdriver')

describe('Jest and Selenium Testing', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
  });

  afterAll(async () => {
    await driver.quit();
  });

  const setDelay = async () => {
    await driver.sleep(1000);
  };

  test("As a user I want to navigate to the Home page and check that the title is Home", async () => {
    await driver.get("http://localhost:3000");
    await driver.getTitle().then((title) => {
      expect(title).toEqual('Home');
    });
    setDelay();
  });

  test("As a user I want to navigate to the Contact page and check that the title is Contact Us", async () => {
    await driver.get("http://localhost:3000/contact");
    await driver.getTitle().then((title) => {
      expect(title).toEqual('Contact Us');
    });
    setDelay();
  });

  test("As a user I want to input an email, click to submit, and the message should say More Info Coming To + the entered email", async () => {
    await driver.get("http://localhost:3000/contact");
    let element = await driver.findElement(By.id("formInput"));
    await element.sendKeys('happyvariables@yahoo.com', Key.TAB);
    let email = await element.getAttribute("value");
    let button = await driver.findElement(By.id("formSubmit"));
    await button.click().then( async () => {
      let message = await driver.findElement(By.id("formMessage")).getText();
      expect(message).toEqual('More info coming to '+email);
    });
    setDelay();
  })

});
