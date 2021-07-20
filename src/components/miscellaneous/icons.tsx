import React from "react";
import { Icon } from "@chakra-ui/react";
import { BiBot, BiMeteor } from "react-icons/bi"
import { HiLightningBolt } from "react-icons/hi"
import { RiSwordFill } from "react-icons/ri"
import { GiBrain, GiMuscleUp } from "react-icons/gi"
import { FiEdit, FiMoon, FiSearch, FiTool, FiTrash2, FiUser, FiUserPlus, FiUsers, FiZap, FiRepeat, FiCornerUpLeft, 
    FiChevronsUp, FiChevronsDown, FiFlag } from "react-icons/fi"

export const NewUserIcon = (props: any) => <Icon {...props} as={FiUserPlus} />

export const UserIcon = (props: any) => <Icon {...props} as={FiUser} />

export const UsersIcon = (props: any) => <Icon {...props} as={FiUsers} />

export const LogOutIcon = (props: any) => <Icon {...props} as={FiMoon} />

export const ManageIcon = (props: any) => <Icon {...props} as={FiTool}/>

export const SearchIcon = (props: any) => <Icon {...props} as={FiSearch} />

export const PlayIcon = (props: any) => <Icon {...props} as={FiZap}/>

export const DeleteIcon = (props: any) => <Icon {...props} as={FiTrash2} />

export const EditIcon = (props: any) => <Icon {...props} as={FiEdit} />

export const AiIcon = (props: any) => <Icon {...props} as={BiBot} />

export const RetryIcon = (props: any) => <Icon {...props} as={FiRepeat} />

export const ReturnIcon = (props: any) => <Icon {...props} as={FiCornerUpLeft}/>

export const HeightIcon = (props: any) => <Icon {...props} as={FiChevronsUp}/>

export const WeightIcon = (props: any) => <Icon {...props} as={FiChevronsDown}/>

export const IntelligenceIcon = (props: any) => <Icon {...props} as={GiBrain}/>

export const SpeedIcon = (props: any) => <Icon {...props} as={HiLightningBolt}/>

export const PowerIcon = (props: any) => <Icon {...props} as={BiMeteor}/>

export const CombatIcon = (props: any) => <Icon {...props} as={RiSwordFill}/>

export const StrengthIcon = (props: any) => <Icon {...props} as={GiMuscleUp}/>

export const SurrenderIcon = (props: any) => <Icon {...props} as={FiFlag} />
