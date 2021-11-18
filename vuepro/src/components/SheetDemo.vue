<template>
  <div class="exceljs-demo">
    <input type="file" accept="application/x-ms-excel" @input="onInput" />
  </div>
</template>

<script setup>
/**
 * SheetJs 支持 xls 和 xlsx ，但是不支持读写图片。
 */
import XLSX from "xlsx";

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
  console.log(worksheet.A1.v, worksheet.A2.w);
};
</script>