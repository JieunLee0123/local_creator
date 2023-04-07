<template>
  <section id="moviesPage">
    <div class="container">
      <h1 class="section_title mb-10">로컬크리에이터</h1>

      <div class="my-10 flex gap-5 items-center">
        <select v-model="selectedValue" v-on:change="changeSelect" id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option v-for="option in options" :value="option.value" v-bind:key="option.value">{{ option.value }}</option>
        </select>

        <button type="button" v-on:click="clickCSVDownload" class="w-[20%] text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          CSV Download
        </button>
      </div>

      <div class="relative overflow-x-auto mb-20">
        <table class="w-full text-sm text-left text-gray-800 dark:text-gray-400">
          <thead class="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="w-[10%] px-6 py-3">
                타이틀
              </th>
              <th scope="col" class="w-[10%] px-6 py-3">
                선정년도
              </th>
              <th scope="col" class="w-[20%] px-6 py-3">
                소재지
              </th>
              <th scope="col" class="w-[15%] px-6 py-3">
                7대분야
              </th>
              <th scope="col" class="w-[50%] px-6 py-3">
                컨텐츠
              </th>
            </tr>
          </thead>

          <tbody v-if="datas">
            <tr v-for="data in datas" :key="data.title" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ data.title }}
              </th>
              <td class="px-6 py-4">
                {{ data.selectYear }}
              </td>
              <td class="px-6 py-4">
                {{ data.location }}
              </td>
              <td class="px-6 py-4">
                {{ data.field }}
              </td>
              <td class="px-6 py-4">
                {{ data.content }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      datas: [],
      // option 변경될 수 있음 주의
      options: [
        { value: "서울" },
        { value: "부산" },
        { value: "대구" },
        { value: "인천" },
        { value: "광주" },
        { value: "대전" },
        { value: "울산" },
        { value: "경기" },
        { value: "강원" },
        { value: "충남" },
        { value: "충북" },
        { value: "경남" },
        { value: "경북" },
        { value: "전남" },
        { value: "전북" },
        { value: "제주" },
        { value: "세종" },
      ],
      selectedValue: ''
    }
  },
  mounted() {
    this.$http.get('/api/localCreator')
      .then(res => {
       this.pushParserDatas(res.data)
    })
  },
  methods: {
    jsonToString(json_data) {
      let csv_string = '타이틀|선정년도|소재지|7대분야|컨텐츠\r\n';

      // const json_array = JSON.parse(json_data);
      const json_array = json_data;

      json_array.forEach((content, index) => {
        let row = ''; 
        for (let title in content) { 
          row += (row === '' ? `${content[title]}` : `|${content[title]}`);
        }
        csv_string += (index !== json_array.length - 1 ? `${row}\r\n` : `${row}`);
      })

      return csv_string;
    },
    clickCSVDownload() {
      const csv_string = this.jsonToString(this.datas);

      const blob = new Blob(["\ufeff" + csv_string], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob)

      const anchor = document.createElement('a');
      anchor.target = '_blank';
      anchor.href = url;
      anchor.download = 'localCreator.csv';
      anchor.click();
    },
    pushParserDatas(data) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');

      const lists = doc.querySelectorAll('.local_list > li')
      lists.forEach(li => {
        const [titleTag, selectYearTag, locationTag, fieldTag, contentTag] = [
          li.querySelector('.tit'),
          li.querySelector('.list_ul > li:nth-child(1)'),
          li.querySelector('.list_ul > li:nth-child(2)'),
          li.querySelector('.list_ul > li:nth-child(3)'),
          li.querySelector('.cont')
        ]

        const [title, selectYear, location, field, content] = [
          (titleTag ? titleTag.innerText.replaceAll(/\n/ig, '').replaceAll(/\t/ig, '') : '-'),
          (selectYearTag ? selectYearTag.innerText.replace('선정년도', '') : '-'),
          (locationTag ? locationTag.innerText.replace('소재지', '') : '-'),
          (fieldTag ? fieldTag.innerText.replace('7대분야', '') : '-'),
          (contentTag ? contentTag.innerText.replace('▶ ', '').replaceAll(/\n/ig, '').replaceAll(/\t/ig, '') : '-')
        ]

        const obj = {
          title: title,
          selectYear: selectYear,
          location: location,
          field: field,
          content: content
        }

        this.datas.push(obj)
      })
    },
    changeSelect() {
      this.datas = []

      this.$http.post('/api/localCreator', { value: this.selectedValue })
        .then(res => {
          this.pushParserDatas(res.data)
        })
    }
  }
}
</script>

