<template>
  <q-page
    v-if="!loggedUser"
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274c5, #5a4a9f)"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width: 400px; height: 540px">
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input
                square
                clearable
                v-model="userName"
                type="userName"
                lazy-rules
                :rules="[this.required]"
                label="user name"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="password"
                type="password"
                lazy-rules
                :rules="[this.required]"
                label="password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <q-input
                v-if="register"
                square
                clearable
                v-model="repassword"
                :type="passwordFieldType"
                lazy-rules
                :rules="[this.required, this.diffPassword]"
                label="confirm password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-lg">
            <q-btn
              unelevated
              size="lg"
              color="secondary"
              @click="submit"
              class="full-width text-white"
              label="submit"
            />
          </q-card-actions>
          <q-card-section
            v-if="!register"
            class="text-center q-pa-sm"
            @click="register = !register"
          >
            <p class="text-grey-6">don't have an account? register here</p>
          </q-card-section>

          <q-card-section
            v-if="register"
            class="text-center q-pa-sm"
            @click="register = !register"
          >
            <p class="text-grey-6">already have an account? sign in here</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
  <q-page class="flex flex-center" v-else>
    <div class="q-pa-md full-width">
      <q-table
        grid
        class="fit"
        title="Listings"
        :rows="listings"
        row-key="name"
        hide-header
        :rows-per-page-options="[0]"
      >
        <template v-slot:top-right>
          <q-btn
            round
            icon="add"
            color="primary"
            @click="newListingDialog = true"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
            <q-tooltip> add listing </q-tooltip>
          </q-btn>
        </template>

        <template v-slot:item="props">
          <div class="col-3 q-pa-md">
            <q-card class="cursor-pointer" @click="selectCard(props.row)">
              <q-img height="150px" :src="props.row.thumbnail" />

              <q-separator />
              <q-card-section class="text-center">
                <strong>{{ props.row.name }}</strong>
                <br />
                {{ props.row.price }} $
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>

      <q-table
        grid
        class="fit"
        title="Residents"
        :rows="residents"
        row-key="name"
        hide-header
        :rows-per-page-options="[0]"
      >
        <template v-slot:top-right>
          <q-btn
            round
            icon="add"
            color="primary"
            @click="residents.push({ name: 'new Resident', url: '' })"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
            <q-tooltip> add resident </q-tooltip>
          </q-btn>
        </template>

        <template v-slot:item="props">
          <div class="col-3 q-pa-md">
            <q-card class="cursor-pointer" @click="selectResident(props.row)">
              <q-img height="150px" :src="props.row.url" />

              <q-separator />
              <q-card-section class="text-center">
                <strong>{{ props.row.name }}</strong>
                <br />
                {{ props.row.price }}
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="viewDialog">
      <q-card>
        <img :src="selected.thumbnail" />

        <q-separator />
        <q-card-section class="text-center">
          <strong>{{ selected.name }}</strong>
          <br />
          {{ selected.price }}
        </q-card-section>

        <q-separator />
        <q-card-section>
          {{ selected.description }}
        </q-card-section>

        <q-separator />
        <q-card-section>
          {{ selected.address }}, {{ selected.city }}
        </q-card-section>

        <q-separator />
        <q-card-section>
          <q-item
            v-for="(resident, i) in selected.residents"
            :key="resident.id"
          >
            <q-item-section avatar>
              <q-btn
                round
                flat
                icon="close"
                @click="
                  selected.residents = selected.residents.filter(
                    (res) => res._id !== resident._id
                  )
                "
                color="red"
              />
            </q-item-section>
            <q-item-section v-if="resident.name !== 'new Resident'">{{
              resident.name
            }}</q-item-section>
            <q-item-section v-else>
              <q-select
                filled
                v-model="selected.residents[i]"
                :options="residentOptions"
                label="Resident name"
                emit-value
                map-options
              />
            </q-item-section>
            <q-item-section avatar>
              <q-avatar>
                <img :src="resident.url" />
              </q-avatar>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-card-section class="text-center">
          <q-btn
            round
            flat
            icon="add"
            @click="
              selected.residents.push({
                name: 'new Resident',
                thumbnail:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrNNNNepn2DcQBB590qojcCr39yb6NDry9L4a4-0FCHgMKEP-hsEJnSj9z-_Vz-Dw4maA&usqp=CAU',
                label: 'Pick new resident',
                value: {},
              })
            "
          />
        </q-card-section>
        <q-separator />

        <q-card-actions class="justify-around">
          <q-btn
            flat
            color="negative"
            v-close-popup
            @click="deleteLisitng(selected)"
            >delete listing</q-btn
          >
          <q-btn flat color="positive" @click="addListing(selected)"
            >save changes</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="editResidentDialog">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar>
            <img :src="selectedResident.url" />
          </q-avatar>
          <div class="column q-gutter-y-sm">
            <q-input
              filled
              v-model="selectedResident.name"
              class="q-px-sm"
              label="Name"
            />
            <q-input
              filled
              v-model="selectedResident.url"
              class="q-px-sm"
              label="Thumbnail URL"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="justify-between">
          <q-btn
            flat
            label="Delete Resident"
            @click="deleteResident"
            color="negative"
            v-close-popup
          />
          <q-btn
            flat
            label="save"
            color="positive"
            @click="saveResident"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="newListingDialog">
      <q-card>
        <q-card-section class="q-gutter-sm column">
          <q-input
            filled
            v-model="newListing.name"
            counter
            label="Name"
            maxlength="30"
          />
          <q-input
            counter
            filled
            v-model="newListing.description"
            label="Description"
            type="textarea"
            maxlength="300"
          />

          <div class="row">
            <q-input
              class="col-6 q-pr-sm"
              filled
              v-model="newListing.city"
              label="City"
            />
            <q-input
              class="col-6"
              filled
              v-model="newListing.address"
              label="Address"
            />
          </div>

          <q-input
            filled
            prefix="$"
            type="number"
            v-model="newListing.price"
            label="Price"
          />
          <q-input filled v-model="newListing.thumbnail" label="Image Url" />
          <q-btn
            class="col-6"
            @click="addListing(newListing)"
            color="primary"
            label="Submit Listing"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import axios from "axios";

const { ref } = require("@vue/reactivity");
const { computed } = require("@vue/runtime-core");
const difUrl = "http://localhost:3000";
const viewDialog = ref(false);
const newListingDialog = ref(false);
const loggedUser = ref();
const newListing = ref({
  name: "",
  description: "",
  address: "",
  city: "",
  price: 0,
  thumbnail: "",
});

const editResidentDialog = ref(false);
const register = ref(false);
const selectedResident = ref();
const userName = ref("");
const password = ref("");
const repassword = ref("");
const selected = ref();

const selectCard = (item) => {
  selected.value = item;
  if (!selected.value.residents) selected.value.residents = [];
  viewDialog.value = true;
};
const selectResident = (item) => {
  selectedResident.value = item;
  editResidentDialog.value = true;
};

const listings = ref();
const residents = ref();

const getData = async () => {
  getListings();
  getResidents();
};

const getListings = async () => {
  listings.value = (
    await axios.get(difUrl + `/listings/${loggedUser.value._id}`)
  ).data;
};

const getResidents = async () => {
  residents.value = (
    await axios.get(difUrl + `/residents/${loggedUser.value._id}`)
  ).data;
};

loggedUser.value = JSON.parse(localStorage.getItem("user"));
if (loggedUser.value) {
  getData();
}

const required = (val) =>
  (val && val.length > 0) || "you have to fill this field";

const diffPassword = () => {
  return (
    (password && repassword && repassword.value === password.value) ||
    "passwords dosent match!"
  );
};

const submit = async () => {
  if (
    required(userName.value) === "you have to fill this field" ||
    required(password.value) === "you have to fill this field"
  ) {
    alert("you have to fill all the fields");
  } else {
    if (!register.value) {
      loggedUser.value = (
        await axios.post(difUrl + "/users/login", {
          name: userName.value,
          password: password.value,
        })
      ).data;
      if (!loggedUser.value) alert("no such user");
      else {
        localStorage.setItem("user", JSON.stringify(loggedUser.value));
      }
      getData();
    } else {
      if (diffPassword() === "passwords dosent match!")
        alert("you have to fill all the fields");
      else {
        loggedUser.value = (
          await axios.post(difUrl + "/users/register", {
            name: userName.value,
            password: password.value,
          })
        ).data;
        getData();
      }
    }
  }
};

const saveResident = async () => {
  await axios.post(difUrl + "/residents", {
    ...selectedResident.value,
    owner: loggedUser.value._id,
  });
};

const deleteResident = async () => {
  await axios.delete(difUrl + `/residents/${selectedResident.value._id}`);
  residents.value = getResidents();
};

const deleteLisitng = async (listing) => {
  await axios.delete(difUrl + `/listings/${listing._id}`);
  getListings();
};

const addListing = async (list) => {
  if (list.name && list.address && list.city && list.price) {
    await axios.post(difUrl + "/listings", {
      ...list,
      owner: loggedUser.value._id,
    });
    getListings();
    alert("listing was saved!");
  } else {
    console.log(list);
    alert("adding failed. you forgot to fill some fields");
  }
};

const residentOptions = computed(() =>
  residents.value
    .map((res) => ({ label: res.name, value: res }))
    .filter(
      (r) =>
        !selected.value.residents.filter((a) => a._id === r.value._id).length > 0
    )
);


</script>
