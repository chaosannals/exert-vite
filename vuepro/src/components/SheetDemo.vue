<template>
  <div class="exceljs-demo">
    <input type="file" accept="application/x-ms-excel" @input="onInput" />
  </div>
</template>

<script setup>
import { onBeforeMount } from "vue";
/**
 * SheetJs 支持 xls 和 xlsx ，但是不支持读写图片。
 */
import XLSX from "xlsx";

const AZ_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const AZ_COUNT = AZ_CHARSET.length;

// 10转26进制 A-Z
const toAZ = (n) => {
  let r = [];
  while (true) {
    let i = n % AZ_COUNT;
    n = Math.floor(n / AZ_COUNT);
    r.push(AZ_CHARSET[i]);
    if (n > 0) {
      n = n - 1;
    } else {
      break;
    }
  }
  return r.reverse().join("");
};

//
const toAZN = (x, y) => {
  let t = toAZ(x);
  return `${t}${y}`;
};
onBeforeMount(() => {
  let r = [];
  for (let i = 0; i < 1000; ++i) {
    r.push(toAZ(i));
  }
  console.log(r);
});

const readFile = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onloadend = (e) => {
      let binary = "";
      let bytes = new Uint8Array(e.target.result);
      let length = bytes.byteLength;
      for (let i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      resolve(binary);
    };
    reader.onerror = (e) => reject(e);
    reader.readAsArrayBuffer(file);
  });
};

const onInput = async (e) => {
  let b = await readFile(e.target.files[0]);
  let workbook = XLSX.read(b, {
    type: "binary",
    cellDates: true,
    cellStyles: true,
  });
  let sheetName = workbook.SheetNames[0];
  let worksheet = workbook.Sheets[sheetName];
  console.log(worksheet);
};
</script>