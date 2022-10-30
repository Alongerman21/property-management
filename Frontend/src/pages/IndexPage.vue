<template>
  <div>
    <q-page v-if="!loggedUser" class="window-height window-width row justify-center items-center"
      style="background: linear-gradient(#8274c5, #5a4a9f)">
      <div class="column q-pa-lg">
        <div class="row">
          <q-card square class="shadow-24" style="width: 400px; height: 540px">
            <q-card-section>
              <q-form class="q-px-sm q-pt-xl">
                <q-input square clearable v-model="userName" type="userName" lazy-rules :rules="[this.required]"
                  label="user name">
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
                <q-input square clearable v-model="password" type="password" lazy-rules :rules="[this.required]"
                  label="password">
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                </q-input>
                <q-input v-if="register" square clearable v-model="repassword" :type="passwordFieldType" lazy-rules
                  :rules="[this.required, this.diffPassword]" label="confirm password">
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                </q-input>
              </q-form>
            </q-card-section>

            <q-card-actions class="q-px-lg">
              <q-btn unelevated size="lg" color="secondary" @click="submit" class="full-width text-white"
                label="submit" />
            </q-card-actions>
            <q-card-section v-if="!register" class="text-center q-pa-sm" @click="register = !register">
              <p class="text-grey-6">don't have an account? register here</p>
            </q-card-section>

            <q-card-section v-if="register" class="text-center q-pa-sm" @click="register = !register">
              <p class="text-grey-6">already have an account? sign in here</p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
    <q-page class="flex flex-center" v-else-if="isTenants">
      <div class="q-pa-md full-width">
        <q-btn color="primary" label="properties" @click="isTenants = false" />

        <q-table grid title="Tenants" :rows="tenants" row-key="name" hide-header :rows-per-page-options="[0]">
          <template v-slot:top-right>
            <q-btn round icon="add" color="primary" @click="addNewTenant()">
              <q-tooltip> add tenant </q-tooltip>
            </q-btn>
          </template>

          <template v-slot:item="props">
            <div class="col-3 q-pa-md">
              <q-card class="cursor-pointer" @click="selectTenant(props.row)">
                <q-card-section class="text-center">
                  <strong>{{ props.row.firstName + " " +  props.row.lastName}}</strong>
                  <q-separator />
                  {{ 'id: ' + props.row.id }}
                  <br/>
                  {{ 'phone: ' + props.row.phone }}
                  <br/>
                  {{ 'email: ' + props.row.email }}
                  <br/>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-table>

      </div>
    </q-page>

    <q-page class="flex flex-center" v-else>
      <l-map style="height: 50vh" :center="[32.0442, 34.8637]" :zoom="11">
        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap"
          :min-zoom="12" :max-zoom="18"></l-tile-layer>
        <l-marker v-for="listing in listings || []" :key="listing._id" :lat-lng="[listing.x, listing.y]"
          @click="selectCard(listing)">
        </l-marker>
      </l-map>

      <div class="q-pa-md full-width">
        <q-btn color="primary" label="Tenants" @click="isTenants = true" />
        <q-table grid class="fit" title="Properties" :rows="listings" row-key="name" hide-header
          :rows-per-page-options="[0]">
          <template v-slot:top-right>
            <q-btn icon="add" color="primary" label="Property" @click="newListingDialog = true">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
              <q-tooltip> add property </q-tooltip>
            </q-btn>
          </template>

          <template v-slot:item="props">
            <div class="col-12 col-md-3 q-pa-md">
              <q-card class="cursor-pointer" @click="selectCard(props.row)">
                <q-img height="150px" :src="props.row.thumbnail" />

                <q-separator />
                <q-card-section class="text-center">
                  <strong>{{ props.row.name }}</strong>
                  <br />
                  {{ props.row.price }} ₪
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-table>
      </div>

    </q-page>

    <q-dialog v-model="viewDialog">
      <q-card>
        <img :src="selected.thumbnail" />

        <q-separator />
        <q-card-section class="text-center">
          <strong>{{ selected.name }}</strong>
          <br />
          {{ selected.price + '₪' }}
        </q-card-section>

        <q-separator />
        <q-card-section>
          {{ 'description: ' + selected.description }}
        </q-card-section>

        <q-separator />
        <q-card-section>
          {{ 'address: ' + selected.address }}, {{ selected.city }}
        </q-card-section>

        <q-separator v-if="!!selected.startDate && !!selected.endDate" />
        <q-card-section v-if="!!selected.startDate && !!selected.endDate">
          {{ selected.startDate }} - {{ selected.endDate }}
        </q-card-section>

        <q-separator />
        <q-card-section>
          <q-item v-for="(tenant, i) in selected.tenants" :key="tenant.id">
            <q-item-section avatar>
              <q-btn round flat icon="close" @click="
                selected.tenants = selected.tenants.filter(
                  (res) => res._id !== tenant._id
                )
              " color="red" />
            </q-item-section>
            <q-item-section v-if="tenant.firstName !== 'new Tenant'">{{
                tenant.firstName + ' ' + tenant.lastName
            }}</q-item-section>
            <q-item-section v-else>
              <q-select filled v-model="selected.tenants[i]" :options="tenantOptions" label="Tenant name" emit-value
                map-options />
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-card-section class="text-center">
          <q-btn round flat icon="add" @click="
            selected.tenants.push({
              firstName: 'new Tenant',
              label: 'Pick new tenant',
              value: {},
            })
          " />
        </q-card-section>
        <q-separator />

        <q-card-actions class="justify-around">
          <q-btn flat color="negative" v-close-popup @click="deleteLisitng(selected)">delete listing</q-btn>
          <q-btn flat color="positive" @click="addListing(selected)">save changes</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="tenantDialog">
      <q-card>
        <q-card-section class="row items-center">
          <div class="column q-gutter-y-sm">
            <q-input filled v-model="selectedTenant.firstName" label="First name" :rules="[this.required]" />
            <q-input filled v-model="selectedTenant.lastName" label="Last name" :rules="[this.required]" />
            <q-input filled v-model="selectedTenant.phone" label="Phone" :rules="[this.required]" />
            <q-input filled v-model="selectedTenant.id" label="Id" :rules="[this.required]" />
            <q-input filled v-model="selectedTenant.email" label="Email" />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="justify-between">
          <q-btn flat label="Delete Tenant" @click="deleteTenant" color="negative" :disabled="!selectedTenant._id"/>
          <q-btn flat label="save" color="positive" @click="saveTenant(newTenant)" v-close-popup /> 
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="newListingDialog">
      <q-card>
        <q-card-section class="q-gutter-sm column">
          <q-input filled v-model="newListing.name" counter label="Name" maxlength="30" />
          <q-input counter filled v-model="newListing.description" label="Description" type="textarea"
            maxlength="300" />

          <div class="row">
            <q-input class="col-6 q-pr-sm" filled v-model="newListing.city" label="City" :rules="[this.required]" />
            <q-input class="col-6" filled v-model="newListing.address" label="Address" :rules="[this.required]" />
          </div>
          <div class="row">
            <q-input class="col-6 q-pr-sm" filled v-model="newListing.x" type="number" label="Latitude" />
            <q-input class="col-6" filled v-model="newListing.y" type="number" label="Longitude" />
          </div>
          <q-input filled prefix="₪" type="number" v-model="newListing.price" label="Price" :rules="[this.required]" />
          <q-input filled v-model="newListing.startDate" label="Rent start date" mask="date">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="newListing.startDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input filled v-model="newListing.endDate" label="Rent end date" mask="date">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="newListing.endDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input filled v-model="newListing.thumbnail" label="Image Url" />
          <q-input filled v-model="newListing.documents" label="Documents Url" />
          <q-btn class="col-6" @click="addListing(newListing)" color="primary" label="Add property" v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>

</template>

<script setup>
import axios from "axios";

import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTooltip,
  LTileLayer,
  LLayerGroup,
  LMarker,
} from "@vue-leaflet/vue-leaflet";

const { ref } = require("@vue/reactivity");
const { computed } = require("@vue/runtime-core");
const difUrl = "http://localhost:3000";
const viewDialog = ref(false);
const newListingDialog = ref(false);
const tenantDialog = ref(false);
const loggedUser = ref();
const isTenants = ref(false);
const newListing = ref({
  name: "",
  description: "",
  address: "",
  city: "",
  price: 0,
  thumbnail: "",
  documents: "",
  x: "",
  y: "",
  startDate: ref(''),
  endDate: ref('')
});

const newTenant = ref({
  firstName: "",
  lastName: "",
  phone: "",
  id: 0,
  email: "",
});

const register = ref(false);
const selectedTenant = ref();
const userName = ref("");
const password = ref("");
const repassword = ref("");
const selected = ref();

const addNewTenant = () => {
  tenantDialog.value = true;
  selectedTenant.value = newTenant.value;
}

const selectCard = (item) => {
  selected.value = item;
  if (!selected.value.tenants) selected.value.tenants = [];
  viewDialog.value = true;
};
const selectTenant = (item) => {
  tenantDialog.value = true;
  selectedTenant.value = item;
};

const listings = ref();
const tenants = ref();

const getData = async () => {
  getListings();
  getTenants();
};

const getListings = async () => {
  listings.value = (
    await axios.get(difUrl + `/listings/${loggedUser.value._id}`)
  ).data;
};

const getTenants = async () => {
  tenants.value = (
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

const saveTenant = async (tenant) => {
  await axios.post(difUrl + "/residents", {
    ...tenant,
    owner: loggedUser.value._id,
  });
  tenants.value = getTenants();
  newTenant.value.firstName = "";
  newTenant.value.lastName = "";
  newTenant.value.phone = "";
  newTenant.value.id = 0;
  newTenant.value.email = "";
};

const deleteTenant = async () => {
  await axios.delete(difUrl + `/residents/${selectedTenant.value._id}`);
  tenants.value = getTenants();
  tenantDialog.value = false;
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

const tenantOptions = computed(() =>
  tenants.value
    .map((res) => ({ label: `${res.firstName} ${res.lastName}`, value: res }))
    .filter(
      (r) =>
        !selected.value.tenants.filter((a) => a._id === r.value._id).length >
        0
    )
);

const tenantsDetails = computed(() =>
  tenants.value.map(tenant => {
    const { _id, ...otherFields } = tenant;

    return ot
  })
);

</script>
