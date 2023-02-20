import ExternalServices from "./ExternalServices.mjs"

const externalServices = new ExternalServices();

export default class Country {
    constructor() {}

    async getAllCountriesList() {

        const countryList = await externalServices.findAllCountry();
        return countryList
    }

    async showCountryDropDown(callback) {
        const countryList = await this.getAllCountriesList();
        console.log(countryList)

        const dropdown = document.getElementById("countries");

        countryList.forEach(element => {
            const newOption = document.createElement("option");
            newOption.value = element.name.official;
            newOption.innerHTML = element.name.official;

            dropdown.appendChild(newOption);

        });
    }
}