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

// Excel 的特殊进制，不是26进制， 10进制转 Excel A-Z
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

// 逆向 Excel A-Z 转 10进制
const formAZ = (t) => {
  let mi = t.length - 1;
  let r = 0;
  for (let j = 0; j < t.length; ++j) {
    let i = mi - j;
    let ci = AZ_CHARSET.indexOf(t[i]);
    r += i == mi ? ci : Math.pow(AZ_COUNT, j) * (ci + 1);
  }
  return r;
};

//
const toAZN = (x, y) => {
  let t = toAZ(x);
  return `${t}${y}`;
};

const formAZN = (t) => {
  let m = t.match(/^([A-Z]+)([0-9]+)$/);
  if (m) {
    return {
      row: m[2],
      column: m[1],
    };
  }
  return null;
};
onBeforeMount(() => {
  let r = [];
  let rc = [];
  for (let i = 0; i < 1000; ++i) {
    let c = toAZ(i);
    r.push(c);
    rc.push(formAZ(c));
  }
  console.log(r, rc);
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
  console.log(worksheet["!ref"]);
};
</script>