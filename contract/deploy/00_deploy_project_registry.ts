import { ethers } from 'hardhat'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { deployContract, deployUpgradable } from '../utils/deploySimple'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, fetchIfDifferent } = deployments
  const { deployer } = await getNamedAccounts()
  const deployerSigner = await ethers.getSigner(deployer);

  const insuranceMasterchef = await deployContract(hre, 'InsuranceMasterchef')
  const insuranceNft = await deployContract(hre, 'InsuranceNft')
  const insurancePool = await deployContract(hre, 'InsurancePool', insuranceNft.address, insuranceMasterchef.address)
  const insuranceFactory = await deployContract(hre, 'InsuranceFactory', insurancePool.address)
  
  const baseToken = await deployContract(hre, 'FakeUSDC')

  const earthRegistrarController = await deployContract(
    hre, 
    'EarthRegistrarController',
    deployer,
    '0x205f4a8557dd0db1ef6d10050f4306b94c7ebb3c4ae9ea761eb8dfafc1ed27d5',
    '0x90b765bcb20121828Ec92ef957645d86722D16cA',
    '0x1eBC01F781d25108D6f7D6DF290E7F53EaA60FD8',
    baseToken.address,
    insuranceFactory.address,
    '0xF54e60b6926504A2Ce79214274201257a19e8FD7',
  )
}

func.id = 'ProjectRegistry'
func.tags = ['ProjectRegistry']
func.dependencies = []

export default func
