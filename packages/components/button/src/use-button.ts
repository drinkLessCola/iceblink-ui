import { ref, useSlots, type SetupContext, computed } from 'vue'
import type { ButtonProps, ButtonEmits } from './button'

export const useButton = (
  props: ButtonProps, 
  emit: SetupContext<ButtonEmits>['emit']
) => {

  // 对按钮实例的 ref
  const _ref = ref<HTMLButtonElement>()
  const slots = useSlots()

  // 获取相关配置
  const _size = computed(() => props.size)
  const _disabled = computed(() => props.disabled)
  const _type = computed(() => props.type || '')

  const autoInsertSpace = computed(() => props.autoInsertSpace ?? false)
  // 默认插槽只有一个根结点，并且根结点的类型为 Text，并且文本内容为 2 个以上的汉字。
  const shouldAddSpace = computed(() => {
    const defaultSlot = slots.default?.()
    if(autoInsertSpace.value && defaultSlot?.length === 1) {
      const slot = defaultSlot[0]
      if(slot?.type === Text) {
        const text = slot.children as string
        return /^\p{Unified_Ideograph}{2}$/u.test(text.trim())
      }
    }
    return false;
  })

  const handleClick = (evt: MouseEvent) => {
    if(props.nativeType === 'reset') {
      // 重置表单字段
    }
    emit('click', evt)
  }

  return {
    _disabled,
    _size,
    _type,
    _ref,
    shouldAddSpace,
    handleClick
  }
}