<template>
  <!-- 重写modelValue的值 -->
  <el-input
    v-bind="props"
    :modelValue="inputValue"
    @input="$emit('update:modelValue', $event)"
    @change="inputChange"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
    @clear="$emit('clear')"
    class="input"
  >
    <template v-for="(_, slot) in slots" :key="slot" v-slot:[slot]="slotProps">
      <slot :name="slot" v-bind="slotProps"></slot>
    </template>
  </el-input>
</template>

<script lang="ts">
// import type { PropType, Component } from "vue";
import type { PropType } from "vue";
import type { EpPropMergeType } from "element-plus/es/utils/index.mjs";

// 为了让 TypeScript 正确地推导出组件选项内的类型
import { defineComponent, ref, watchEffect, computed } from "vue";
/**
 * ref 和 toRef的区别
 * ref 是 复制, 数据更新了不会更改原数据, 视图会更新
 * toRef 是 引用, 数据更新了, 原数据也会更新, 视图不会更新
 */
/**
 * type 和 interface
 * type
 *  可以定义
 *    基础类型 string
 *    联合类型 string | number
 *    交叉类型 type1(对象类型) & type2(对象类型)
 * 扩张性 | 和 &
 * 不允许重复声明同名类型
 * type 可以获取 typeof 返回的值作为类型
 *    type Element = typeof document.createElement("div")
 *
 * interface
 *  仅定义 对象类型
 *    { name: string, age: number}
 * 扩张性 可以用 implements extend
 * 同名类型会合并
 */
// size 的类型
// type SizeType = "large" | "default" | "small";
export default defineComponent({
  name: "BaseInput",
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    // 修饰符
    modelModifiers: {
      type: Object,
      // default: () => ({}),
    },
    type: {
      type: String,
      default: "text",
    },
    maxlength: {
      type: [Number, String],
      // default: 200,
    },
    minlength: {
      type: Number,
    },
    /**
     * 是否显示输入字数统计
     * type 需为 text 或 textarea
     * 配合 maxlength 一起使用
     */
    showWordLimit: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "请输入内容",
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    // 是否显示切换密码图标
    showPassword: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // large / default / small
    size: {
      // 通过vue中PropType, 提供更确定的类型
      //   type: String as PropType<>,
      type: String as PropType<
        EpPropMergeType<
          StringConstructor,
          "large" | "default" | "small",
          unknown
        >
      >,
      default: "default",
      /**
       * 自定义校验类型函数
       * typescript版本低于 4.7
       * 必须使用箭头函数
       */
      validator: (value: string) => {
        return ["large", "default", "small"].includes(value);
      },
    },
    // 自定义前缀图标
    prefixIcon: {
      /**
       * type 的值仅有
       *  String/Number/Boolean/Date/Symbol
       *  Array/Object/Function
       */
      // type: [String, Component],
      type: String,
      default: "",
    },
    // 自定义后缀图标
    suffixIcon: {
      // type: [String, Component],
      type: String,
      default: "",
    },
    rows: {
      type: Number,
      default: 2,
    },
    // textarea 高度是否自适应
    autosize: {
      // { minRows: 2, maxRows: 6 }
      type: [Boolean, Object],
      default: false,
    },
    /**
     * 输入字段是否应该启用自动完成功能
     * 表单中输入框填充
     */
    autocomplete: {
      type: String as PropType<"on" | "off">,
      default: "off",
    },
    name: {
      type: String,
    },
    // 只读
    readonly: {
      type: Boolean,
      default: false,
    },
    /**
     * 数值区间
     * min、max、step的类型都是暂定
     * Firefox 不支持 input 标签的 max 和 min 属性
     */
    min: {
      type: [String, Number],
    },
    max: {
      type: [String, Number],
    },
    step: {
      type: [String, Number],
    },
    // 控制是否能被用户缩放
    resize: {
      type: String as PropType<"none" | "both" | "horizontal" | "vertical">,
      default: "none",
    },
    // 自动获取焦点
    autofocus: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    // tabIndex 属性设置或返回元素的 tab 键控制次序。
    tabindex: {
      type: [String, Number],
    },
    // 输入时是否触发表单的校验
    validateEvent: {
      type: Boolean,
      default: true,
    },
    // input 元素或 textarea 元素的 style
    inputStyle: {
      type: Object,
      default: () => ({}),
    },
    width: {
      type: [Number, String],
      default: 198,
    },
  },

  // emits: {},
  /**
   * 需先在emits中定义
   * template 和 script 才能使用
   */
  emits: ["update:modelValue", "focus", "blur", "clear"],

  /**
   * setup只执行一次
   * props 父组件传给子组件的参数
   * ctx 又叫 context  上下文(里面有一个emit)
   */
  setup(props, ctx) {
    // 计算输入框宽度
    const inputWidth = computed(() => {
      // 传入 number或 string类型的参数 as number | string
      const width = props.width;
      if (typeof width === "number") {
        return `${width}px`;
      }
      if (typeof width === "string") {
        // 以 "px" 或 "%" 结尾
        if (width.endsWith("px") || width.endsWith("%")) {
          return width;
        }
        let num = Number(width);
        if (!isNaN(num) && num > 0) {
          return `${width}px`;
        }
      }
    });

    type ValueType = string | number;
    // 绑定控件的值
    const inputValue = ref("");
    const modelModifiers = props.modelModifiers;
    // 通过修饰符限制用户的输入 <T extends ValueType>(val: T):T
    function limitInput(val: ValueType) {
      if (modelModifiers && val !== "") {
        let strVal: string = val + "";
        // nonnegative 非负整数
        if (modelModifiers.nonnegative) {
          strVal = strVal.replace(/\D/g, "");
          (val as number) = Number(strVal);
        }
        // decimal 小数
        if (modelModifiers.decimal) {
          // 清除数字和小数点和负号以外的字符
          strVal = strVal.replace(/[^\d.-]/g, "");
          // 只保留第一个负号
          strVal = strVal
            .replace(/^-/, "$#$") // 仅以负号开头,才用 "$#$" 进行代替
            .replace(/-/g, "") // 清除其他负号
            .replace("$#$", "-"); // 换回来
          // 不能以小数点开头
          strVal = strVal.replace(/^\./, "");
          // 只保留第一个小数点
          strVal = strVal
            .replace(".", "$#$") // 第一个小数点以 "$#$" 进行代替
            .replace(/\./g, "") // 清除其他小数点
            .replace("$#$", "."); // 换回来
          /**
           * 输入需要做防抖处理
           * 防抖: 防抖触发高频率事件时n秒后只会执行一次,
           *      如果n秒内再次触发,则会重新计算。
           * 节流: 高频事件触发,每次触发事件时设置一个延迟调用方法，
           *      并且取消之前的延时调用方法。
           * 区别: 函数防抖一定时间连续触发的事件,只在最后执行一次,
           *      而函数节流一段时间内只执行一次。
           * 还有许多的bug (已在change事件中做处理)
           *    eg: 可以输入 -.123  1. 等等
           *    目前仅做到这里, 后续再看吧
           * 数据为什么不能是number类型
           *    如果是number, 由于是每更新一次,调用这个函数
           *    会发现永远都输不进去小数点
           */
          // (val as number) = Number(strVal);
          (val as string) = strVal;
        }
      }
      return val;
    }
    /**
     * 监听属性 watch 和 watchEffect
     *  watch
     *    侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。
     *  watchEffect
     *    立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行
     */

    //监听单个的ref
    // const  a = ref(0)
    // watch(a,(newval,oldval)=>{
    //  console.log(newval,oldval)
    // })
    // //监听多个ref
    // const  b = ref(0)
    // watch([a,b],(newval,oldval)=>{
    //  console.log(newval,oldval)
    // })
    // //监听reactive
    // const reactiveData = reactive({
    //  a:1,
    //  b:2,
    //  c:3
    // })
    // watch(data,(newVal,oldVal)=>{
    //  console.log(newVal,oldVal)
    // })
    //监听reactive下的某一个属性
    // 回调的入参也变成了数组，每个数组里面的顺序和数据源数组排序一致
    // watch([()=>data.a,()=>data.b],([newA,newB],[oldA,oldB])=>{
    //  console.log([newA,newB])
    // })

    // watch(
    //   () => props.modelValue,
    //   (newVal, oldVal) => {
    //     // let timer;
    //     // timer && clearTimeout(timer);
    //     // timer = setTimeout(() => {
    //     (inputValue.value as ValueType) = limitInput(newVal);
    //     // }, 50);
    //   }
    // );
    watchEffect(() => {
      /**
       * ref 解包
       * 仅当 ref 是模板渲染上下文的顶层 property 时才适用自动“解包”
       * 所以在template中 可以直接使用inputValue
       * 而无需inputValue.value 进行传值
       */
      (inputValue.value as ValueType) = limitInput(props.modelValue);
    });
    // watchEffect(limitInput(props.modelValue)) 这样可以监听?
    /**
     * input 输入框的change事件
     * change是保证失去焦点后所传出的值始终与最后一次的值一致
     */
    const inputChange = (e: ValueType) => {
      if (modelModifiers?.decimal) {
        // 失去焦点后不能小数点作为结尾
        e = (e as string).replace(/\.$/, "");
        // 输入的是 -.123 会转化为 -0.123
        e = (e as string).replace("-.", "-0.");
        // 转化为数字进行输出
        const num = e === "" ? "" : Number(e);
        (inputValue.value as ValueType) = num;
        ctx.emit("update:modelValue", num);
        return;
      }
      ctx.emit("update:modelValue", e);
    };
    return {
      props,
      inputValue,
      inputChange,
      inputWidth,
      slots: ctx.slots,
    };
  },
});
</script>

<style lang="scss" scoped>
.input {
  /**
    vue 和 @vue/compiler-sfc 版本号在 3.2.0 以上
    基于 CSS Variables 兼容性
    使用说明:
      理论上 v-bind 函数可以在 Vue 内部支持任意的 JS 表达式，
      但由于可能包含在 CSS 标识符中无效的字符，
      因此官方是建议在大多数情况下，用引号括起来
    由于 CSS 变量的特性，(仅初次渲染生效)
    因此对 CSS 响应式属性的更改不会触发模板的重新渲染
    */
  width: v-bind("inputWidth") !important;
  /** 
      深度操作符 (样式穿透) >>> 、 /deep/ 和 ::v-deep
      >>> 和 /deep/ 已进入弃用阶段（虽然暂时还没完全移除）
      ::v-deep .class-name {....}，现在这种写法也废弃了
      目前使用的是 :deep(.className 或 #id)
    */
}
</style>
