<template>
  <div class="exceljs-demo">
    <input type="file" accept=".xlsx" @input="onInput" />
  </div>
</template>

<script setup>
/**
 * 只能读写 xlsx
 * xls 不能不再支持了。。
 *
 */
import ExcelJS from "exceljs";

const readFile = (blob) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onloadend = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = (e) => {
      reject(e);
    };
    reader.readAsArrayBuffer(blob);
  });
};

const onInput = async (e) => {
  const f = e.target.files[0];
  const b = await readFile(f);
  console.log(b);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(b);
  const worksheet = workbook.getWorksheet();
  for (let i = 0; i < worksheet.rowCount; ++i) {
    let r = worksheet.getRow(i);
    let c1 = r.getCell(1);
    let c2 = r.getCell(2);
    console.log(c1.value, c1.text, c2.value, c2.text);
  }
};
</script>
