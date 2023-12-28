/*
 * @Descripttion:
 * @Version: v0.1.0
 * @Author: shenziqiang
 * @Date: 2023-10-08 11:13:27
 * @LastEditors: shenziqiang
 * @LastEditTime: 2023-12-26 11:37:22
 */

import { ModalForm, ProFormText, ProFormTextArea, ProFormSwitch } from '@ant-design/pro-components';

import { getSwitchValue } from '@/utils/code';

import { updateRole } from '@/services/sys';

export default function RoleAddModalForm({
  updateModalOpen,
  setUpdateModalOpen,
  actionRef,
  currentRow,
  setCurrentRow,
}) {
  return (
    <ModalForm
      width="600px"
      title="更新角色"
      modalProps={{ destroyOnClose: true }}
      open={updateModalOpen}
      onOpenChange={setUpdateModalOpen}
      onFinish={async (value) => {
        const valueSubmit = {
          ...value,
          id: currentRow?.id,
          dataStatus: getSwitchValue(value.dataStatus),
        };
        const success = await updateRole(valueSubmit as API.RoleListItem);
        if (success) {
          setUpdateModalOpen(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
      }}
      onCancel={() => {
        setUpdateModalOpen(false);
        setCurrentRow(undefined);
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
        initialValue={currentRow?.roleCode || ''}
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
        initialValue={currentRow?.roleName || ''}
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
        initialValue={currentRow?.dataStatus || ''}
      />
      <ProFormTextArea
        width="md"
        name="remark"
        label="描述"
        initialValue={currentRow?.remark || ''}
      />
    </ModalForm>
  );
}
