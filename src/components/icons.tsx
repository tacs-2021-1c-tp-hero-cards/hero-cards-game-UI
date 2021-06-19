import React from "react";
import { Icon } from "@chakra-ui/react";
import { FiEdit, FiMoon, FiSearch, FiTool, FiTrash2, FiUser, FiUserPlus, FiZap } from "react-icons/fi"

export const NewUserIcon = () => <Icon as={FiUserPlus} />

export const UserIcon = () => <Icon as={FiUser} />

export const LogOutIcon = () => <Icon as={FiMoon} />

export const ManageIcon = () => <Icon as={FiTool}/>

export const SearchIcon = () => <Icon as={FiSearch} />

export const PlayIcon = () => <Icon as={FiZap}/>

export const DeleteIcon = () => <Icon as={FiTrash2} />

export const EditIcon = () => <Icon as={FiEdit} />
