import React from "react";
import { Modal, Form, Input, Button } from "antd";

interface CategoryModalProps {
  inputVisible: boolean;
  setInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddNewCategory: (newCategory: string) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  inputVisible,
  setInputVisible,
  handleAddNewCategory,
}) => {
  const [form] = Form.useForm();

  const onFinish = (data: { category: string }) => {
    handleAddNewCategory(data?.category);
    setInputVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setInputVisible(false);
  };

  return (
    <Modal
      width={640}
      title={<div>Add new</div>}
      open={inputVisible}
      onCancel={handleCancel}
      footer={null}
      className="!rounded-xl"
    >
      <div className="rounded-b-3xl p-8">
        <Form form={form} onFinish={onFinish} layout="vertical">
          <p className="font-degular text-lg font-normal mb-3">Categories</p>
          <Form.Item
            name="category"
            rules={[
              { required: true, message: "Please enter a category name !" },
            ]}
          >
            <Input
              className="bg-[#F0F0F0] p-5 border-none"
              placeholder="Type here..."
            />
          </Form.Item>
          <div className="flex gap-5">
            <Form.Item className="flex-1 ">
              <Button
                className="w-full  mt-4 py-6 bg-[#fff5f4] text-red-500  text-white font-degular"
                type="default"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Form.Item>
            <Form.Item className="flex-1">
              <Button
                className="w-full mt-4 py-6  bg-[#E7F056] text-black   font-degular"
                type="default"
                htmlType="submit"
              >
                Add
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default CategoryModal;
