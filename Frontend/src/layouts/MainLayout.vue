<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-primary text-white">
        <q-avatar>
          <img
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZGVmcz4KICA8Y2xpcFBhdGggaWQ9ImEiPgogICA8cGF0aCBkPSJtMTM5LjIxIDE5OWg0NzMuNTh2MzYwaC00NzMuNTh6Ii8+CiAgPC9jbGlwUGF0aD4KIDwvZGVmcz4KIDxnIGNsaXAtcGF0aD0idXJsKCNhKSI+CiAgPHBhdGggZD0ibTYwOS40MyA0NzIuNzctODQuODk4LTc1LjEyMWMtMi4wNTg2LTEuODIwMy00Ljg4MjgtMi40NzY2LTcuNTIzNC0xLjc4NTJsLTU2LjE4IDE0LjgyNGMtMy4yNjE3IDAuODYzMjgtNS42NzE5IDMuNjQ4NC02LjA1MDggNy4wMDM5bC0xLjM3ODkgMTIuMzI0LTI4LjAxMi02Ljg2NzItMC4wMDM5MDYtNjUuNjA1IDI5LjUgMjYuOTM4IDI2LjUyMy0yOS4wNTEtMTcwLjMzLTE1NS40Ny03NS43MTEgNjcuODA5di0zMS41MjdoLTQwLjQ2MXY2Ny43N2wtNTUuNjkxIDQ5Ljg3NSAyNi4yNDYgMjkuMzAxIDI5LjQ0MS0yNi4zNTkgMC4xODM1OSAyMDEuNSA1MC4xNDgtMC4wMDM5MDd2LTEwOS4zMmg0OC4yMTl2MTA5LjMxbDEzMS45NS0wLjAwMzkwNi0wLjAxNTYyNS0xMjUuOTEgMjcgNi42MTcyLTQuMDg1OSAzNi40NTNjLTAuMzA0NjkgMi42NjAyIDAuNzE0ODQgNS4zMDg2IDIuNzM4MyA3LjA3NDJsODQuMDQ3IDczLjc0NmMxLjU1NDcgMS4zNjMzIDMuNDgwNSAyLjAzNTIgNS40MTAyIDIuMDM1MiAyLjI1NzggMCA0LjQ5NjEtMC45Mjk2OSA2LjExMzMtMi43NDIybDYzLjUxMi03MS4yMjNjMS40NTctMS42Mjg5IDIuMTkxNC0zLjc2NTYgMi4wNjY0LTUuOTM3NS0wLjEzNjcyLTIuMTc5Ny0xLjEyNS00LjIxNDgtMi43NTM5LTUuNjYwMnptLTMxNS45OC02OC43N2gtNDguMjE5di00OS43M2g0OC4yMTl6bTgzLjMyIDBoLTQ4LjIxOXYtNDkuNzNoNDguMjE5em0xNjMgMTM0LjYxLTc0LjcyMy02NS41NjYgMy4zODI4LTMwLjA5OCAxMi41MzEgMy4wNzAzYzAuNDQ5MjIgNS40NjQ4IDQuMjUzOSAxMC4yODUgOS44NzExIDExLjY1NiA3LjAxNTYgMS43MjI3IDE0LjEwMi0yLjU2NjQgMTUuODMyLTkuNTg5OCAxLjcyMjctNy4wMjM0LTIuNTcwMy0xNC4xMDktOS41OTM4LTE1LjgyOC01LjM0NzctMS4zMDg2LTEwLjcxOSAwLjg4NjcyLTEzLjc0MiA1LjA4OThsLTEzLjg4Ny0zLjQwNjIgMC45OTYwOS04LjgzOTggNDYuNTEyLTEyLjI3MyA3NS40NjEgNjYuNzY2eiIgZmlsbD0iI2ZmZiIvPgogPC9nPgo8L3N2Zz4K"
          />
        </q-avatar>

        <q-toolbar-title>Real Estate</q-toolbar-title>

        <q-btn round flat icon="logout" @click="logout()" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

const logout = () => {
  localStorage.clear();
  window.location.reload();
};

export default defineComponent({
  name: "MainLayout",
  setup() {
    return { logout };
  },
});
</script>
