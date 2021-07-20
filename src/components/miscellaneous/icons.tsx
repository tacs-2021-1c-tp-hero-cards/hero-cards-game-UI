import React from "react";
import { Icon } from "@chakra-ui/react";
import { BiBot, BiMeteor } from "react-icons/bi"
import { HiLightningBolt } from "react-icons/hi"
import { RiSwordFill } from "react-icons/ri"
import { GiBrain, GiMuscleUp } from "react-icons/gi"
import { FiEdit, FiMoon, FiSearch, FiTool, FiTrash2, FiUser, FiUserPlus, FiUsers, FiZap, FiRepeat, FiCornerUpLeft, 
    FiChevronsUp, FiChevronsDown, FiFlag } from "react-icons/fi"

export const NewUserIcon = () => <Icon as={FiUserPlus} />

export const UserIcon = () => <Icon as={FiUser} />

export const UsersIcon = () => <Icon as={FiUsers} />

export const LogOutIcon = () => <Icon as={FiMoon} />

export const ManageIcon = () => <Icon as={FiTool}/>

export const SearchIcon = () => <Icon as={FiSearch} />

export const PlayIcon = () => <Icon as={FiZap}/>

export const DeleteIcon = () => <Icon as={FiTrash2} />

export const EditIcon = () => <Icon as={FiEdit} />

export const AiIcon = () => <Icon as={BiBot} />

export const RetryIcon = () => <Icon as={FiRepeat} />

export const ReturnIcon = () => <Icon as={FiCornerUpLeft}/>

export const HeightIcon = () => <Icon as={FiChevronsUp}/>

export const WeightIcon = () => <Icon as={FiChevronsDown}/>

export const IntelligenceIcon = () => <Icon as={GiBrain}/>

export const SpeedIcon = () => <Icon as={HiLightningBolt}/>

export const PowerIcon = () => <Icon as={BiMeteor}/>

export const CombatIcon = () => <Icon as={RiSwordFill}/>

export const StrengthIcon = () => <Icon as={GiMuscleUp}/>

export const SurrenderIcon = () => <Icon as={FiFlag} />
