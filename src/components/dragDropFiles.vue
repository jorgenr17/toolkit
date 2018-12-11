<template>
  <div class="uploader" @dragenter="OnDragEnter" @dragleave="OnDragLeave" @dragover.prevent @drop="onDrop" :class="{dragging: isDragging }">
    <div>
      <v-icon color="white" size="60px">cloud_upload</v-icon>
      <p>Arrastra tu archivo aquí</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data: () => ({
		name: 'dragDropFiles',
    isDragging: false,
    dragCount: 0
  }),
	methods: {
	  OnDragEnter(e) {
	    e.preventDefault()
	    this.dragCount++
	    this.isDragging = true
	    return false
	  },
    OnDragLeave(e) {
	    e.preventDefault()
	    this.dragCount--
	    if (this.dragCount <= 0) {
	      this.isDragging = false
			}
    },
    onDrop(e) {
      e.preventDefault()
      e.stopPropagation()
			let file = e.dataTransfer.files[0]
      let extension = file.name.split('.')[1]
      if (extension !== 'csv') {
        alert('Por favor ingrese un archivo valido (".csv").')
      } else {
        let reader = new FileReader()
        reader.readAsText(file)
        reader.onload = this.loadHandler
      }
    },
    loadHandler (event) {
      let file2 = event.target.result
      let array = []
      let allTextLines = file2.split(/\r\n|\n/);
      let lines = {};
      let obj = {}
      let titles = allTextLines[0].split(';');
      for (let i=1; i<allTextLines.length; i++) {
        let data = allTextLines[i].split(';');
        for (let j=0; j<titles.length; j++) {
          if (data[j] != '' && data[j] != undefined) {
            obj[titles[j]] = data[j]
          }
        }
        if (Object.keys(obj).length !== 0) {
          array.push(obj)
          obj = {}
        }
      }
      console.log(array)
    }
  }
}
</script>

<style lang="css" scoped>
.uploader {
  width: 100%;
  background: #848484;
	height: 190px;
  color: #fff;
  padding: 40px 15px;
  text-align: center;
  border-radius: 10px;
  border: 3px dashed #fff;
  font-size: 20px;
  position: relative;
	&.dragging {
    background: #fff;
    color: #2196F3;
    border: 3px dashed #2196F3;
	}
  i {
    font-size: 85px;
  }
}
.uploader:hover {
  border: 2px dashed #000;
	background: #BDBDBD;
	font-weight: bold;
	font-size: 21px;
	-webkit-transition: background, border .50s;
	transition: background, border .50s;
}
</style>
