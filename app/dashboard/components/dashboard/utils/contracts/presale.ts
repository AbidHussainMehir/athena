import { createThirdwebClient, defineChain, getContract } from 'thirdweb'
import { polygonAmoy, sepolia } from 'thirdweb/chains'

const CLIENT_ID = 'c8002c96c081491631b8c79d0a64f164'
export const PresSaleContractAddress =
  // '0x64612e57da8EF97C57886EAEC8c70BA0C584eC6D'
  '0xdD4cCf374dea422D984f6676195A484FffA1FE37'

const PresSaleContractABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'startTimestamp', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'maxClaimableSupply',
            type: 'uint256'
          },
          { internalType: 'uint256', name: 'supplyClaimed', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'quantityLimitPerWallet',
            type: 'uint256'
          },
          { internalType: 'bytes32', name: 'merkleRoot', type: 'bytes32' },
          { internalType: 'uint256', name: 'pricePerToken', type: 'uint256' },
          { internalType: 'address', name: 'currency', type: 'address' },
          { internalType: 'string', name: 'metadata', type: 'string' }
        ],
        indexed: false,
        internalType: 'struct IClaimCondition.ClaimCondition[]',
        name: 'claimConditions',
        type: 'tuple[]'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'resetEligibility',
        type: 'bool'
      }
    ],
    name: 'ClaimConditionsUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'prevURI',
        type: 'string'
      },
      { indexed: false, internalType: 'string', name: 'newURI', type: 'string' }
    ],
    name: 'ContractURIUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'delegator',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'fromDelegate',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'toDelegate',
        type: 'address'
      }
    ],
    name: 'DelegateChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'delegate',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'previousBalance',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newBalance',
        type: 'uint256'
      }
    ],
    name: 'DelegateVotesChanged',
    type: 'event'
  },
  { anonymous: false, inputs: [], name: 'EIP712DomainChanged', type: 'event' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'platformFeeRecipient',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'flatFee',
        type: 'uint256'
      }
    ],
    name: 'FlatPlatformFeeUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint8', name: 'version', type: 'uint8' }
    ],
    name: 'Initialized',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maxTotalSupply',
        type: 'uint256'
      }
    ],
    name: 'MaxTotalSupplyUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'platformFeeRecipient',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'platformFeeBps',
        type: 'uint256'
      }
    ],
    name: 'PlatformFeeInfoUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum IPlatformFee.PlatformFeeType',
        name: 'feeType',
        type: 'uint8'
      }
    ],
    name: 'PlatformFeeTypeUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }
    ],
    name: 'PrimarySaleRecipientUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32'
      }
    ],
    name: 'RoleAdminChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'RoleGranted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'RoleRevoked',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'claimConditionIndex',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'claimer',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startTokenId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantityClaimed',
        type: 'uint256'
      }
    ],
    name: 'TokensClaimed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    inputs: [],
    name: 'CLOCK_MODE',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'burnFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'uint32', name: 'pos', type: 'uint32' }
    ],
    name: 'checkpoints',
    outputs: [
      {
        components: [
          { internalType: 'uint32', name: 'fromBlock', type: 'uint32' },
          { internalType: 'uint224', name: 'votes', type: 'uint224' }
        ],
        internalType: 'struct ERC20VotesUpgradeable.Checkpoint',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '_receiver', type: 'address' },
      { internalType: 'uint256', name: '_quantity', type: 'uint256' },
      { internalType: 'address', name: '_currency', type: 'address' },
      { internalType: 'uint256', name: '_pricePerToken', type: 'uint256' },
      {
        components: [
          { internalType: 'bytes32[]', name: 'proof', type: 'bytes32[]' },
          {
            internalType: 'uint256',
            name: 'quantityLimitPerWallet',
            type: 'uint256'
          },
          { internalType: 'uint256', name: 'pricePerToken', type: 'uint256' },
          { internalType: 'address', name: 'currency', type: 'address' }
        ],
        internalType: 'struct IDrop.AllowlistProof',
        name: '_allowlistProof',
        type: 'tuple'
      },
      { internalType: 'bytes', name: '_data', type: 'bytes' }
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'claimCondition',
    outputs: [
      { internalType: 'uint256', name: 'currentStartId', type: 'uint256' },
      { internalType: 'uint256', name: 'count', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'clock',
    outputs: [{ internalType: 'uint48', name: '', type: 'uint48' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'contractType',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [],
    name: 'contractURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'contractVersion',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' }
    ],
    name: 'decreaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'delegatee', type: 'address' }],
    name: 'delegate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'delegatee', type: 'address' },
      { internalType: 'uint256', name: 'nonce', type: 'uint256' },
      { internalType: 'uint256', name: 'expiry', type: 'uint256' },
      { internalType: 'uint8', name: 'v', type: 'uint8' },
      { internalType: 'bytes32', name: 'r', type: 'bytes32' },
      { internalType: 'bytes32', name: 's', type: 'bytes32' }
    ],
    name: 'delegateBySig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'delegates',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { internalType: 'bytes1', name: 'fields', type: 'bytes1' },
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'string', name: 'version', type: 'string' },
      { internalType: 'uint256', name: 'chainId', type: 'uint256' },
      { internalType: 'address', name: 'verifyingContract', type: 'address' },
      { internalType: 'bytes32', name: 'salt', type: 'bytes32' },
      { internalType: 'uint256[]', name: 'extensions', type: 'uint256[]' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getActiveClaimConditionId',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_conditionId', type: 'uint256' }
    ],
    name: 'getClaimConditionById',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'startTimestamp', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'maxClaimableSupply',
            type: 'uint256'
          },
          { internalType: 'uint256', name: 'supplyClaimed', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'quantityLimitPerWallet',
            type: 'uint256'
          },
          { internalType: 'bytes32', name: 'merkleRoot', type: 'bytes32' },
          { internalType: 'uint256', name: 'pricePerToken', type: 'uint256' },
          { internalType: 'address', name: 'currency', type: 'address' },
          { internalType: 'string', name: 'metadata', type: 'string' }
        ],
        internalType: 'struct IClaimCondition.ClaimCondition',
        name: 'condition',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getFlatPlatformFeeInfo',
    outputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'timepoint', type: 'uint256' }],
    name: 'getPastTotalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'uint256', name: 'timepoint', type: 'uint256' }
    ],
    name: 'getPastVotes',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getPlatformFeeInfo',
    outputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint16', name: '', type: 'uint16' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getPlatformFeeType',
    outputs: [
      {
        internalType: 'enum IPlatformFee.PlatformFeeType',
        name: '',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'uint256', name: 'index', type: 'uint256' }
    ],
    name: 'getRoleMember',
    outputs: [{ internalType: 'address', name: 'member', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
    name: 'getRoleMemberCount',
    outputs: [{ internalType: 'uint256', name: 'count', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_conditionId', type: 'uint256' },
      { internalType: 'address', name: '_claimer', type: 'address' }
    ],
    name: 'getSupplyClaimedByWallet',
    outputs: [
      {
        internalType: 'uint256',
        name: 'supplyClaimedByWallet',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'getVotes',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' }
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' }
    ],
    name: 'hasRole',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' }
    ],
    name: 'hasRoleWithSwitch',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'addedValue', type: 'uint256' }
    ],
    name: 'increaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '_defaultAdmin', type: 'address' },
      { internalType: 'string', name: '_name', type: 'string' },
      { internalType: 'string', name: '_symbol', type: 'string' },
      { internalType: 'string', name: '_contractURI', type: 'string' },
      {
        internalType: 'address[]',
        name: '_trustedForwarders',
        type: 'address[]'
      },
      { internalType: 'address', name: '_saleRecipient', type: 'address' },
      {
        internalType: 'address',
        name: '_platformFeeRecipient',
        type: 'address'
      },
      { internalType: 'uint128', name: '_platformFeeBps', type: 'uint128' }
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'forwarder', type: 'address' }],
    name: 'isTrustedForwarder',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'maxTotalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes[]', name: 'data', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ internalType: 'bytes[]', name: 'results', type: 'bytes[]' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'nonces',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'numCheckpoints',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      { internalType: 'uint8', name: 'v', type: 'uint8' },
      { internalType: 'bytes32', name: 'r', type: 'bytes32' },
      { internalType: 'bytes32', name: 's', type: 'bytes32' }
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'primarySaleRecipient',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' }
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' }
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'startTimestamp', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'maxClaimableSupply',
            type: 'uint256'
          },
          { internalType: 'uint256', name: 'supplyClaimed', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'quantityLimitPerWallet',
            type: 'uint256'
          },
          { internalType: 'bytes32', name: 'merkleRoot', type: 'bytes32' },
          { internalType: 'uint256', name: 'pricePerToken', type: 'uint256' },
          { internalType: 'address', name: 'currency', type: 'address' },
          { internalType: 'string', name: 'metadata', type: 'string' }
        ],
        internalType: 'struct IClaimCondition.ClaimCondition[]',
        name: '_conditions',
        type: 'tuple[]'
      },
      { internalType: 'bool', name: '_resetClaimEligibility', type: 'bool' }
    ],
    name: 'setClaimConditions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'string', name: '_uri', type: 'string' }],
    name: 'setContractURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_platformFeeRecipient',
        type: 'address'
      },
      { internalType: 'uint256', name: '_flatFee', type: 'uint256' }
    ],
    name: 'setFlatPlatformFeeInfo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_maxTotalSupply', type: 'uint256' }
    ],
    name: 'setMaxTotalSupply',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_platformFeeRecipient',
        type: 'address'
      },
      { internalType: 'uint256', name: '_platformFeeBps', type: 'uint256' }
    ],
    name: 'setPlatformFeeInfo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'enum IPlatformFee.PlatformFeeType',
        name: '_feeType',
        type: 'uint8'
      }
    ],
    name: 'setPlatformFeeType',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '_saleRecipient', type: 'address' }
    ],
    name: 'setPrimarySaleRecipient',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_conditionId', type: 'uint256' },
      { internalType: 'address', name: '_claimer', type: 'address' },
      { internalType: 'uint256', name: '_quantity', type: 'uint256' },
      { internalType: 'address', name: '_currency', type: 'address' },
      { internalType: 'uint256', name: '_pricePerToken', type: 'uint256' },
      {
        components: [
          { internalType: 'bytes32[]', name: 'proof', type: 'bytes32[]' },
          {
            internalType: 'uint256',
            name: 'quantityLimitPerWallet',
            type: 'uint256'
          },
          { internalType: 'uint256', name: 'pricePerToken', type: 'uint256' },
          { internalType: 'address', name: 'currency', type: 'address' }
        ],
        internalType: 'struct IDrop.AllowlistProof',
        name: '_allowlistProof',
        type: 'tuple'
      }
    ],
    name: 'verifyClaim',
    outputs: [{ internalType: 'bool', name: 'isOverride', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const

export const client = createThirdwebClient({ clientId: CLIENT_ID })

export const chain = defineChain(sepolia)
export const PreSaleContract = getContract({
  client: client,
  chain: chain,
  address: PresSaleContractAddress,
  abi: PresSaleContractABI
})
