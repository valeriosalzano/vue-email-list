const { createApp } = Vue

  createApp({
    data() {
      return {
        progressiveMails : [],
        mailsNumber : 10,
        bonusMails : []
      }
    },
    mounted(){
      this.getRandomMailsProgressive(this.mailsNumber);
      this.getRandomMailsBonus(this.mailsNumber);
    },
    methods: {
      // funzione che genera progressivamente gli indirizzi mail in base ai tempi di risposta del server
      getRandomMailsProgressive(number){
        for(i=0; i<number; i++){
          // simuliamo una latenza di "i" secondi per ogni richiesta
          setTimeout(()=> {
            axios.get('https://flynn.boolean.careers/exercises/api/random/mail')
            .then( (response,i) => this.progressiveMails.push(response.data.response));
          }, 1000*i);
        }
      },
      // BONUS funzione che rilascia la lista solo quando completata
      getRandomMailsBonus(number){
        let mails = [];
        for(i=0; i<number; i++){
          // simuliamo una latenza di "i" secondi per ogni richiesta
          setTimeout(()=>{
            axios.get('https://flynn.boolean.careers/exercises/api/random/mail')
            .then( (response) => {
              mails.push(response.data.response);
              mails.length == number ? this.bonusMails = mails : '';
            })
          },1000*i)
          ;
        }
      }
    }
  }).mount('#app');