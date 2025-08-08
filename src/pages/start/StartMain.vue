<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import apiCall from '@/scripts/api-call';
import { storePlayer } from '@/scripts/store-player';
import { notifyInfo } from '@/scripts/store-popups';

const router = useRouter();

const playerId = ref('');
const playerPassword = ref('');
const playerMoney = ref('');
const isNewPlayer = ref(false);

const login = async () => {
  const url = '/api/players/login';
  const requestBody = {
    playerId: playerId.value,
    playerPassword: playerPassword.value,
  }

  const response = await apiCall.post(url, null, requestBody);
  if (response.result === apiCall.Response.SUCCESS) {
    storePlayer(response.body); // 플레이어 정보를 저장
    router.push('/stock');
  } else {
    isNewPlayer.value = true;
    notifyInfo("초기투자금을 입력후 [플레이어 등록] 버튼을 누르세요.");
  }
}

const signup = async () => {
  const url = '/api/players';
  const requestBody = {
    id: 0,
    playerId: playerId.value,
    playerPassword: playerPassword.value,
    playerMoney: playerMoney.value
  }

  const response = await apiCall.post(url, null, requestBody);
  if (response.result === apiCall.Response.SUCCESS) {
    isNewPlayer.value = false;
    login();
  }
}
</script>

<template>
  <div class="container-sm mt-3 border border-2 p-1" style="max-width: 600px">
    <div class="bss-background p-1">
      <template v-if="isNewPlayer">
        <div class="mt-3 d-flex justify-content-center" style="height: 230px;">
          <span class="text-center text-danger fs-1 fw-bold mt-4">SKALA STOCK Market</span>
        </div>
        <div class="row bg-info-subtle p-2 m-1" style="opacity: 95%;">
          <div class="col">
            <InlineInput label="플레이어ID" class="mb-1" v-model="playerId" type="text" placeholder="플레이어ID 입력" />
            <InlineInput label="비밀번호" class="mb-1" v-model="playerPassword" type="password" placeholder="비밀번호 입력" />
          </div>
          <div class="d-flex justify-content-end">
            <button v-if="isNewPlayer" class="btn btn-primary btn-sm" @click="signup">회원가입</button>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="mt-3 d-flex justify-content-center" style="height: 230px;">
          <span class="text-center text-danger fs-1 fw-bold mt-4">SKALA STOCK Market</span>
        </div>
        <div class="row bg-info-subtle p-2 m-1" style="opacity: 95%;">
          <div class="col">
            <InlineInput label="플레이어ID" class="mb-1" v-model="playerId" type="text" placeholder="플레이어ID" />
            <InlineInput label="비밀번호" class="mb-1" v-model="playerPassword" type="password" placeholder="비밀번호"
              @input-enter-pressed="login" />
          </div>
          <div class="d-flex justify-content-end">
            <button class="btn btn-primary btn-sm" @click="login">로그인</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.bss-background {
  width: 590px;
  height: 380px;
  background-image: url('/logo.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
