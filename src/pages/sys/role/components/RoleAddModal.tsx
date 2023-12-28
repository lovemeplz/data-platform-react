/*
 * @Descripttion:
 * @Version: v0.1.0
 * @Author: shenziqiang
 * @Date: 2023-10-08 11:13:27
 * @LastEditors: shenziqiang
 * @LastEditTime: 2023-12-26 11:28:51
 */

import { ModalForm, ProFormText, ProFormTextArea, ProFormSwitch } from '@ant-design/pro-components';

import { getSwitchValue } from '@/utils/code';

import { addRole } from '@/services/sys';

export default function RoleAddModal({ addModalOpen, setAddModalOpen, actionRef, currentRow }) {
  return (
    <ModalForm
      title="新增角色"
      width="600px"
      open={addModalOpen}
      onOpenChange={setAddModalOpen}
      onFinish={async (value) => {
        const valueSubmit = {
          ...value,
          dataStatus: getSwitchValue(value.dataStatus),
        };
        const success = await addRole(valueSubmit as API.RoleListItem);
        if (success) {
          setAddModalOpen(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
      }}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: '此为必填项',
          },
        ]}
        width="md"
        name="roleCode"
        label="角色编码"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '此为必填项',
          },
        ]}
        width="md"
        name="roleName"
        label="角色名称"
      />
      <ProFormSwitch
        rules={[
          {
            required: true,
            message: '此为必填项',
          },
        ]}
        width="md"
        name="dataStatus"
        label="状态"
        initialValue={currentRow?.dataStatus || true}
      />
      <ProFormTextArea width="md" name="remark" label="描述" />
    </ModalForm>
  );
}
