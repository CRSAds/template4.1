window.campaignContent = {
  steps: [
    {
      type: "intro",
      image: "gazelle-ebike-header-4-1.png",
      title: "Win een E-bike 🎉",
      text: "Nederland staat met 22 miljoen fietsen wereldwijd bekend als hét ultieme fietsland. Fiets jij graag? Beantwoord een paar vragen en maak kans op een nieuwe Gazelle E-bike!",
      buttonText: "Ga Verder"
    },
    {
      type: "terms",
      title: "Onze actievoorwaarden",
      text: `Klik <a href="#" id="viewSponsors">hier</a> om de sponsors te bekijken.
             U kunt <a href="#" id="optOut">hier klikken</a> om verder te gaan zonder gegevensdeling.`,
      checkboxText: "Ja, ik ga akkoord met de actievoorwaarden",
      buttonText: "Oke, ga verder"
    },
    {
      type: "question",
      id: "q1",
      text: "Hoe vaak fiets je per week?",
      options: ["1-2x", "3-4x", "5+ keer"]
    },
    {
      type: "question",
      id: "q2",
      text: "Zou je elektrisch willen fietsen?",
      options: ["Ja", "Nee", "Misschien"]
    },
    {
      type: "question",
      id: "q3",
      text: "Ben je geïnteresseerd in fietsvakanties?",
      options: ["Ja", "Nee"]
    },
    {
      type: "shortform",
      fields: [
        { id: "gender", label: "Geslacht", type: "select", options: ["Man", "Vrouw"] },
        { id: "firstName", label: "Voornaam", type: "text" },
        { id: "lastName", label: "Achternaam", type: "text" },
        { id: "dob", label: "Geboortedatum", type: "date" },
        { id: "email", label: "E-mailadres", type: "email" }
      ]
    },
    {
      type: "longform",
      condition: "showLongForm == true",
      fields: [
        { id: "zipcode", label: "Postcode", type: "text" },
        { id: "street", label: "Straat", type: "text" },
        { id: "number", label: "Huisnummer", type: "text" },
        { id: "city", label: "Woonplaats", type: "text" },
        { id: "phone", label: "Telefoonnummer", type: "tel" }
      ]
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
