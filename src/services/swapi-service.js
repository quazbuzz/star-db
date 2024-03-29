export default class SwapiService {
  constructor() {
    this.apiBase = 'https://swapi.co/api';
    this.imageBase = 'https://starwars-visualguide.com/assets/img';

    this.getResource = async (url) => {
      const res = await fetch(`${this.apiBase}${url}`);

      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status}`);
      }

      const body = await res.json();
      return body;
    };

    this.getAllPeople = async () => {
      const res = await this.getResource('/people/');
      return res.results.map(this.transformPerson);
    };

    this.getPerson = async (id) => {
      const person = await this.getResource(`/people/${id}`);
      return this.transformPerson(person);
    };

    this.getPersonImage = id => `${this.imageBase}/characters/${id}.jpg`;

    this.getAllPlanets = async () => {
      const res = await this.getResource('/planets/');
      return res.results.map(this.transformPlanet);
    };

    this.getPlanet = async (id) => {
      const planet = await this.getResource(`/planets/${id}`);
      return this.transformPlanet(planet);
    };

    this.getPlanetImage = id => `${this.imageBase}/planets/${id}.jpg`;

    this.getAllStarships = async () => {
      const res = await this.getResource('/starships/');
      return res.results.map(this.transformStarship);
    };

    this.getStarship = async (id) => {
      const starship = await this.getResource(`/starships/${id}`);
      return this.transformStarship(starship);
    };

    this.getStarshipImage = id => `${this.imageBase}/starships/${id}.jpg`;

    this.extractId = (item) => {
      const idRegExp = /\/([0-9]*)\/$/;
      const [, id] = item.url.match(idRegExp);
      return id;
    };

    this.transformPerson = (person) => {
      const {
        name, gender, birth_year: birthYear, eye_color: eyeColor,
      } = person;

      return {
        id: this.extractId(person),
        name,
        gender,
        birthYear,
        eyeColor,
      };
    };

    this.transformPlanet = (planet) => {
      const {
        name, population, rotation_period: rotationPeriod, diameter,
      } = planet;

      return {
        id: this.extractId(planet),
        name,
        population,
        rotationPeriod,
        diameter,
      };
    };

    this.transformStarship = (starship) => {
      const {
        name, model, manufacturer, cost_in_credits: costInCredits,
      } = starship;

      return {
        id: this.extractId(starship),
        name,
        model,
        manufacturer,
        costInCredits,
      };
    };
  }
}
