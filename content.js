window.campaignContent = {
  steps: [
    {
      type: "intro",
      progressLabel: "Laten we beginnen 😄",
      image: "assets/gazelle-ebike-header-4-1.png",
      title: "Win een E-bike 🎉",
      text: "Nederland staat met 22 miljoen fietsen wereldwijd bekend als hét ultieme fietsland. Fiets jij graag? Beantwoord een paar vragen en maak kans op een nieuwe Gazelle E-bike!",
      buttonText: "Ga Verder"
    },
    {
      type: "terms",
      progressLabel: "Voorwaarden akkoord 📄",
      title: "Onze actievoorwaarden",
      text: `Eerst nog wat meer informatie voor we verder gaan. De uitgebreide voorwaarden kunt u onderaan de pagina vinden. We verloten onder de inschrijvingen verschillende mooie prijzen. De winnaars ontvangen een e-mail op het opgegeven adres. We kunnen u deze actie aanbieden mede dankzij onze sponsors. Wij zullen u dan ook graag vrijblijvend mooie aanbiedingen sturen via e-mail of bellen met een uniek aanbod. Door mee te doen met deze campagne worden uw gegevens gedeeld met onze sponsors. Klik <a href="#">hier</a> om de sponsors te bekijken. U kunt <a href="#">hier klikken</a> om verder te gaan zonder uw data te delen met de sponsors.`,
      checkboxText: "Ja, ik ga akkoord met de actievoorwaarden",
      buttonText: "Oke, ga verder"
    },
    {
      type: "question",
      id: "q1",
      progressLabel: "Vraag 1 van 3",
      text: "Hoe vaak zit jij op de fiets?",
      options: ["Elke dag", "Paar keer per week", "Paar keer per maand", "Anders"]
    },
    {
      type: "question",
      id: "q2",
      progressLabel: "Vraag 2 van 3",
      text: "Zou je elektrisch willen fietsen?",
      options: ["Ja", "Nee", "Misschien"]
    },
    {
      type: "question",
      id: "q3",
      progressLabel: "Vraag 3 van 3",
      text: "Ben je geïnteresseerd in fietsvakanties?",
      options: ["Ja", "Nee"]
    },
    {
      type: "shortform",
      progressLabel: "Bedankt!",
      title: "Vul je gegevens in.",
      fields: [
        {
          id: "gender",
          label: "",
          type: "radio",
          options: ["De heer", "Mevrouw"]
        },
        {
          id: "firstName",
          label: "Naam",
          type: "text",
          placeholder: "Je voornaam"
        },
        {
          id: "lastName",
          label: "Achternaam",
          type: "text",
          placeholder: "Je achternaam"
        },
        {
          id: "email",
          label: "E-mail",
          type: "email",
          placeholder: "Vul je e-mailadres in"
        },
        {
          id: "dob",
          label: "Geboortedatum",
          type: "dob"
        }
      ],
      buttonText: "Ga Verder"
    },
    {
      type: "longform",
      progressLabel: "Bijna klaar 📬",
      title: "Laatste stap: adresgegevens",
      condition: "showLongForm == true",
      fields: [
        { id: "zipcode", label: "Postcode", type: "text", placeholder: "1234 AB" },
        { id: "street", label: "Straat", type: "text", placeholder: "Straatnaam" },
        { id: "number", label: "Huisnummer", type: "text", placeholder: "123" },
        { id: "city", label: "Woonplaats", type: "text", placeholder: "Plaatsnaam" },
        { id: "phone", label: "Telefoonnummer", type: "tel", placeholder: "06 12345678" }
      ],
      buttonText: "Doorgaan"
    },
    {
      type: "confirm",
      progressLabel: "Bijna klaar 🤝",
      title: "Bevestig je deelname",
      text: "Bevestig nu je deelname aan deze prijs via onderstaande button. We nemen contact op met de winnaars.",
      buttonText: "🔒 Bevestig deelname >",
      note: "Er volgt een aanbieding van een derde partij op de volgende pagina. Dit heeft geen effect op je deelname aan deze actie en is geheel vrijblijvend."
    }
  ],
  sponsors: [
    {
      triggerStep: "q2",
      answer: "Ja",
      setVariable: { showLongForm: true }
    }
  ]
};
