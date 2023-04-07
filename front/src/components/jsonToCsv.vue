<template>
  <section id="moviesPage">
    <div class="container">
      <h1 class="section_title mb-10">jsonToCsv 로컬크리에이터</h1>

      <button type="button" class="btn btn-info action_btn" v-on:click="downloadCSVData">
          Download
      </button>

      <select v-model="selectedValue" v-on:change="changeSelect" id="countries"
        class="my-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option v-for="option in options" :value="option.value" v-bind:key="option.text">{{ option.text }}</option>
      </select>

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
      csvDatas: [],
      datas: [
        {
          title: 'title',
          selectYear: 'selectYear',
          location: 'location',
          field: 'field',
          content: 'content'
        }
      ],
      // option 변경될 수 있음 주의
      options: [
        { value: "LC01 6", text: "서울" },
        { value: "LC02 4", text: "부산" },
        { value: "LC03 4", text: "대구" },
        { value: "LC04 4", text: "인천" },
        { value: "LC05 4", text: "광주" },
        { value: "LC06 3", text: "대전" },
        { value: "LC07 3", text: "울산" },
        { value: "LC08 4", text: "경기" },
        { value: "LC09 9", text: "강원" },
        { value: "LC10 4", text: "충남" },
        { value: "LC11 4", text: "충북" },
        { value: "LC12 3", text: "경남" },
        { value: "LC13 4", text: "경북" },
        { value: "LC14 4", text: "전남" },
        { value: "LC15 4", text: "전북" },
        { value: "LC16 9", text: "제주" },
        { value: "LC17 3", text: "세종" },
      ],
      selectedValue: ''
    }
  },
  methods: {
    downloadCSVData() {
      function jsonToCSV(json_data) {
        let csv_string = '';

        // const json_array = JSON.parse(json_data);
        const json_array = json_data;
        const titles = Object.keys(json_array[0]);

        // 타이틀 삽입
        titles.forEach((title, index) => {
          csv_string += (index !== titles.length - 1 ? `${title},` : `${title}\r\n`);
        });

        // 컨텐츠 삽입
        json_array.forEach((content, index) => {

          let row = ''; // 각 인덱스에 해당하는 '내용'을 담을 행

          for (let title in content) { // for in 문은 객체의 키값만 추출하여 순회함.
            // 행에 '내용' 할당: 각 내용 앞에 |를 삽입하여 구분, 첫번째 내용은 앞에 |X
            row += (row === '' ? `${content[title]}` : `|${content[title]}`);
          }

          // CSV 문자열에 '내용' 행 삽입: 뒤에 줄바꿈(\r\n) 추가, 마지막 행은 줄바꿈X
          csv_string += (index !== json_array.length - 1 ? `${row}\r\n` : `${row}`);
        })

        return csv_string;
      }

      const csv_string = jsonToCSV(this.datas);

      const blob = new Blob(["\ufeff" + csv_string], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob)

      const anchor = document.createElement('a');
      anchor.target = '_blank';
      anchor.href = url;
      anchor.download = 'localCreator.csv';
      anchor.click();
    },
    changeSelect() {
      this.datas = []

      const [reginCd, pageCntStr] = this.selectedValue.split(' ')
      const pageCnt = parseInt(pageCntStr)

      const data = {
        reginCd: reginCd,
        pageCnt: pageCnt
      }

      this.$http.post('/api/localCreator', data)
        .then(res => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(res.data, 'text/html');

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
              (contentTag ? contentTag.innerText.replace('▶ ', '').replaceAll(/\n/ig, '').replaceAll(/\t/ig, '')  : '-')
            ]

            const obj = {
              title: title,
              selectYear: selectYear,
              location: location,
              field: field,
              content: content
            }

            const arr = [ title, selectYear, location, field, content ]

            this.datas.push(obj)
            this.csvDatas.push(arr)
          })
        })
    }
  }
}
</script>

