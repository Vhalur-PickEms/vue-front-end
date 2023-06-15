<script setup>
import { ref } from "vue";
import LogoutButton from './components/logout-button.vue';
import User from './components/user.vue';
import { useAuth0 } from '@auth0/auth0-vue';

const showModal = ref(false);
const teams = ref([]);
const gameTypes = [1, 3, 5];
const matches = ref([]);

const newMatchTeam1 = ref("");
const newMatchTeam2 = ref("");
const newMatchTime = ref("");
const newMatchGameType = ref("");

const { getAccessTokenSilently } = useAuth0();

const fetchTeamNames = async () => {
  try {
    const res = await fetch('https://localhost:7020/Team');
    const data = await res.json();

    for (const item of data){
      teams.value.push(item.name)
    }

  } catch (error) {
    console.error(error);
  }
}


const fetchTeam = async () => {
          const token = await getAccessTokenSilently();
          console.log(token);
          const response = await fetch('https://localhost:7020/Team', {
            headers: {
              Authorization: 'Bearer ' + token
            }
          });
          const data = await response.json();
          for (const item of data){
            teams.value.push(item.name)
          }
        };

const addMatch = () => {
  matches.value.push({
    id: Math.floor(Math.random() * 1000000),
    team1: newMatchTeam1.value,
    team2: newMatchTeam2.value,
    time: newMatchTime.value,
    gameType: "Best of " + newMatchGameType.value,
  });
  showModal.value = false;
  newMatchTeam1.value = "";
  newMatchTeam2.value = "";
  newMatchTime.value = "";
  newMatchGameType.value = "";
}

// onMounted(fetchTeamNames);

//#region Manual Match
const match1 = {
  id: Math.floor(Math.random() * 1000000),
  team1: "G2 Esports",
  team2: "Fnatic",
  time: "18:00",
  gameType: "Best of 5"
};
matches.value.push(match1);

//#endregion
</script>

<template>
  <main>
    <LogoutButton></LogoutButton>
    <User></User>
    <div>
      <button @click="fetchTeamNames">Get Team Names OLD</button>
    </div>
    <div>
      <button @click="fetchTeam">Get Team Names</button>
    </div>

    <div v-if="showModal" class="overlay">
      <div class="modal">
        <p>Time</p>
        <input v-model="newMatchTime" name="matchTime" id="matchTime"/>
        <p>Team 1</p>
        <select v-model="newMatchTeam1">
          <option value="" disabled>Select a team</option>
          <option v-for="team in teams" :value="team">{{ team }}</option>
        </select>
        <p>Team 2</p>
        <select v-model="newMatchTeam2">
          <option value="" disabled>Select a team</option>
          <option v-for="team in teams" :key="team" :value="team">{{ team }}</option>
        </select>
        <p>Amount of games</p>
        <select v-model="newMatchGameType">
          <option value="" disabled>Select a game type</option>
          <option v-for="gametype in gameTypes" :value="gametype">Best of {{ gametype }}</option>
        </select>
        <button @click="xd">Add Match</button>
        <button class="close" @click="showModal = false">Close</button>
      </div>
    </div>
    <div class="container">
      <header>
        <h1>Matches</h1>
        <button @click="showModal=true">+</button>
      </header>
      <div class="match-container">
        <div v-for="match in matches"
        class="match"
        :key="match.id"
        >
          <h3 class="date">{{ match.time }}</h3>
          <h2 class="main-text">{{ match.team1 }} vs {{ match.team2 }}</h2>
          <p class="gametype">{{ match.gameType }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
    height: 100vh;
    width: 100vw;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  h1 {
    font-weight: bold;
    margin-bottom: 25px;
    font-size: 75px;
  }

  header button {
    border: none;
    padding: 10px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    background-color: white;
    border-radius: 100%;
    color: rgb(21,20,20);
    font-size: 20px;
  }

  .container {
    max-width: 1000px;
    padding: 10px;
    margin: 0 auto;
  }

  .match {
    width: 300px;
    height: 150px;
    background-color: rgb(15,182,44);
    padding: 10px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 20px;
    margin-bottom: 20px;
    color: black;
  }

  .main-text{
    text-align: center;
  }

  .gametype{
    text-align: center;
  }

  .match-container {
    display: block;
    padding: 0% 25%;
  }

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.77);
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  .modal {
    width: 750px;
    background-color: white;
    border-radius: 10px;
    padding: 30px;
    position: absolute;
    display: flex;
    flex-direction: column;
  }

  .modal p{
    color: black;
    padding: 5px 0px;
  }

  .modal button {
    padding: 10px 20px;
    font-size: 20px;
    width: 100%;
    background-color: blueviolet;
    border: none;
    color: white;
    cursor: pointer;
    margin-top: 15px;
  }

  .modal .close {
    background-color: red; 
    margin-top: 7px;
  }

  .modal option {
    color: black;
  }
</style>