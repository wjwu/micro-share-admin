<template>
  <div :id="editorId"></div>
</template>

<script>
export default {
  props: {
    editorId: {
      type: String,
      default: 'editor'
    },
    content: {
      type: String
    },
    width: {
      type: Number
    }
  },
  model: {
    prop: 'content'
  },
  watch: {
    width(culVal, oldVal) {
      document.querySelector(
        `#cke_${this.editorId}`
      ).style.width = `${culVal}px`;
    }
  },
  mounted() {
    const editor = window.CKEDITOR.replace(this.editorId, {
      language: 'zh-cn',
      height: 600,
      width: this.width || '100%',
      filebrowserImageUploadUrl: `${window.config.apiHost}/resource/ck`,
      // extraPlugins: "flash",
      extraPlugins:
        'html5video,colorbutton,tableresize,tabletoolstoolbar,justify,lineheight,font',
      toolbarGroups: [
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        {
          name: 'editing',
          groups: ['find', 'selection', 'spellchecker', 'editing']
        },
        { name: 'links', groups: ['links'] },
        { name: 'forms', groups: ['forms'] },
        { name: 'tools', groups: ['tools'] },
        { name: 'others', groups: ['others'] },
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        {
          name: 'paragraph',
          groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']
        },
        { name: 'styles', groups: ['styles'] },
        '/',
        { name: 'insert', groups: ['insert'] },
        { name: 'colors', groups: ['colors'] },
        {
          name: 'tables',
          groups: [
            'table',
            'tablerow',
            'tablecolumn',
            'tablecell',
            'tablecellmergesplit'
          ]
        }
      ],
      removeButtons: 'Table'
    });
    const _this = this;
    editor.on('change', function(text) {
      _this.$emit('input', window.CKEDITOR.instances[_this.editorId].getData());
      _this.$emit('change');
    });
    editor.on('fileUploadResponse', function(e) {
      const resJson = JSON.parse(e.data.fileLoader.xhr.response);
      const dialog = window.CKEDITOR.dialog.getCurrent();
      dialog.setValueOf('info', 'txtUrl', resJson[0].url);
      dialog.selectPage('info');
      e.stop();
    });
    this.$nextTick(() => {
      window.CKEDITOR.instances[this.editorId].setData(this.content);
    });
  }
};
</script>

