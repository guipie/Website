

let extension = {
  components: {//动态扩充组件或组件路径
    //表单header、content、footer对应位置扩充的组件
    gridHeader: '',
    gridBody: '',
    gridFooter: '',
    //弹出框(修改、编辑、查看)header、content、footer对应位置扩充的组件
    modelHeader: '',
    modelBody: '',
    modelFooter: ''
  },
  text: "只能看到当前角色下的所有帐号",
  buttons: [],//扩展的按钮
  methods: {//事件扩展
    onInit() {
      //缓存当前table页面，点击左边树形菜单时，直接刷新此页面
      this.$store.getters.data().viewGridDemo = this;
      this.boxOptions.height = 400;
    },
    onInited() {
      this.height = this.height - 95;
    },
    searchBefore(param) {
      //点击左边tree时加载table数据，其他情况都不加载数据
      let treeId = this.$store.getters.data().treeDemo1.treeId;
      if (treeId === undefined) {
        return false;
      }
      //将查询的treeid(角色id)提交到后台
      param.value = treeId;
      //生成查询条件
      // param.wheres = [{ name: 'Role_Id', value: treeId }]
      return true;
    },
    addBefore(param) { //保存前
      let treeId = this.$store.getters.data().treeDemo1.treeId;
      if (treeId === undefined) {
        this.$Message.error("请选择左侧角色")
        return false;
      }
      //添加默认新建的值到后台
      //新建用户的角色默认为当前树形菜单选中的角色
      param.mainData.Role_Id = treeId;
      param.mainData.IsRegregisterPhone = 0;
      return true;
    },
    addAfter(result) {//用户新建后，显示随机生成的密码
      if (!result.status) {
        return true;
      }
      return true;
    },
    modelOpenAfter() {
      //点击弹出框后，如果是编辑状态，禁止编辑用户名，如果新建状态，将用户名字段设置为可编辑
      let isEDIT = this.currentAction == this.const.EDIT;
      this.editFormOptions.forEach(item => {
        item.forEach(x => {
          if (x.field == "UserName") {
            this.$set(x, "disabled", isEDIT)
          }
        })
        //不是新建，性别默认值设置为男
        if (!isEDIT) {
          this.editFormFileds.Gender = "0";
        }
      })
    }

  }
};
export default extension;
