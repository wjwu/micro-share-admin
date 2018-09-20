<template>
  <div>
    <select class="dialog-select" :disabled="disabled" v-model="selectedProvince" @change="handleProvinceChange">
      <option :key="item.code" v-for="item in provinces" :value="item.code">
        {{ item.name }}
      </option>
    </select>
    <select class="dialog-select" :disabled="disabled" v-model="selectedCity" @change="handleCityChange">
      <option :key="item.code" v-for="item in cities" :value="item.code">
        {{ item.name }}
      </option>
    </select>
    <select class="dialog-select" :disabled="disabled" v-model="selectedCounty">
      <option :key="item.code" v-for="item in counties" :value="item.code">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>


<script>
import regions from '../utils/regions';

export default {
  props: {
    county: {
      type: String,
      default: '110101'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'county'
  },
  created() {
    this.setSelected('110101');
  },
  watch: {
    county(curVal, oldVal) {
      if (curVal) {
        this.setSelected(curVal);
      }
    },
    selectedCounty(curVal, oldVal) {
      this.$emit('input', curVal);
    }
  },
  data() {
    return {
      selectedProvince: '',
      selectedCity: '',
      selectedCounty: '',
      cities: [],
      provinces: [],
      counties: []
    };
  },
  methods: {
    setSelected(county) {
      this.counties = regions.filter(
        item =>
          item.code.startsWith(county.substr(0, 4)) && !item.code.endsWith('00')
      );
      this.selectedCounty = county;

      this.cities = regions.filter(
        item =>
          item.code.startsWith(county.substr(0, 2)) &&
          item.code.endsWith('00') &&
          !item.code.endsWith('0000')
      );

      this.provinces = regions.filter(item => item.code.endsWith('0000'));
      const city = this.cities.filter(
        item => item.code.substr(0, 4) === county.substr(0, 4)
      )[0];
      this.selectedCity = city.code;
      const provice = this.provinces.filter(
        item => item.code.substr(0, 2) === county.substr(0, 2)
      )[0];
      this.selectedProvince = provice.code;
    },
    handleProvinceChange() {
      const proviceCode = this.selectedProvince;
      this.cities = regions.filter(
        item =>
          item.code.startsWith(proviceCode.substr(0, 2)) &&
          item.code.endsWith('00') &&
          item.code !== proviceCode
      );
      this.selectedCity = this.cities[0].code;
      this.handleCityChange();
    },
    handleCityChange() {
      const cityCode = this.selectedCity;
      this.counties = regions.filter(
        item =>
          item.code.startsWith(cityCode.substr(0, 4)) && item.code !== cityCode
      );
      this.selectedCounty = this.counties[0].code;
    }
  }
};
</script>