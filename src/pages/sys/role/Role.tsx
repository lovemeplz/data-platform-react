import React, { useState, useRef } from 'react';

import { Space, Button, Modal } from 'antd';

import { PageContainer, ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';

import { getRole, deleteRole } from '@/services/sys';

import RoleAddModal from './components/RoleAddModal';
import RoleUpdateModal from './components/RoleUpdateModal';

const RoleTable: React.FC = () => {
  // 用于对表格进行刷新等操作
  const actionRef = useRef<ActionType>();

  // 用于表单回显
  const [currentRow, setCurrentRow] = useState<API.RoleListItem>();

  // 用于批量操作
  const [selectedRowKeysUserDefined, setSelectedRowKeysUserDefined] = useState<(string | number)[]>(
    [],
  );

  // 新增弹窗相关
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

  // 更新弹窗相关
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);

  // 删除确认框相关
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleDeleteModalCancel = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteModalSubmit = async () => {
    let id = '';
    setConfirmLoading(true);
    if (currentRow) {
      id = String(currentRow?.id);
    } else if (selectedRowKeysUserDefined.length) {
      id = selectedRowKeysUserDefined.join();
    }

    const success = await deleteRole(id);
    if (success) {
      setDeleteModalOpen(false);
      setConfirmLoading(false);
      setSelectedRowKeysUserDefined([]);
      if (actionRef && actionRef.current && actionRef.current.clearSelected) {
        actionRef?.current?.clearSelected();
      }

      if (actionRef && actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  // 表格配置
  const columns: ProColumns<API.RoleListItem>[] = [
    {
      title: '角色编码',
      dataIndex: 'roleCode',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '状态',
      dataIndex: 'dataStatus',
    },
    {
      title: '已分配用户',
      dataIndex: 'assignedUsers',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => [
        <a
          key="update"
          onClick={() => {
            setUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDeleteModalOpen(true);
            setCurrentRow(record);
          }}
        >
          删除
        </a>,
        <a
          key="authorize"
          onClick={() => {
            setUpdateModalOpen(true);
            // setCurrentRow(record);
          }}
        >
          授权
        </a>,
        <a
          key="assign"
          onClick={() => {
            setUpdateModalOpen(true);
            // setCurrentRow(record);
          }}
        >
          分配用户
        </a>,
      ],
    },
  ];

  // 表格、弹窗渲染
  return (
    <PageContainer>
      <ProTable<API.RoleListItem, API.PageParams>
        columns={columns}
        actionRef={actionRef}
        request={getRole}
        rowKey="id"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setAddModalOpen(true);
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
        rowSelection={{}}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => {
          console.log(selectedRowKeys, selectedRows);
          // setSelectedRowKeysUserDefined(selectedRowKeys)
          return (
            <Space size={24}>
              <span>已选 {selectedRowKeys.length} 项</span>
            </Space>
          );
        }}
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
              <a
                onClick={() => {
                  setDeleteModalOpen(true);
                }}
              >
                批量删除
              </a>
              <a
                onClick={() => {
                  setAddModalOpen(true);
                }}
              >
                导出数据
              </a>
            </Space>
          );
        }}
      />
      <RoleAddModal
        actionRef={actionRef}
        currentRow={currentRow}
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />
      <RoleUpdateModal
        actionRef={actionRef}
        currentRow={currentRow}
        setCurrentRow={setCurrentRow}
        updateModalOpen={updateModalOpen}
        setUpdateModalOpen={setUpdateModalOpen}
      />
      <Modal
        title="提示"
        open={deleteModalOpen}
        onOk={handleDeleteModalSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleDeleteModalCancel}
      >
        <p>是否确认删除？</p>
      </Modal>
    </PageContainer>
  );
};
export default RoleTable;
