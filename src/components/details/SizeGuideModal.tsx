import { Modal } from "antd"

type SizeGuideModalProps = {
  open: boolean
  onClose: () => void
}

function SizeGuideModal({ open, onClose }: SizeGuideModalProps) {
  return (
    <Modal title="Hướng Dẫn Chọn Size" open={open} onCancel={onClose} footer={null}>
      <div className="space-y-3">
        <p><strong>S:</strong> Dưới 1m60, dưới 55kg</p>
        <p><strong>M:</strong> 1m60 - 1m70, 55 - 65kg</p>
        <p><strong>L:</strong> 1m70 - 1m78, 65 - 75kg</p>
        <p><strong>XL:</strong> Trên 1m78, trên 75kg</p>
      </div>
    </Modal>
  )
}

export default SizeGuideModal
