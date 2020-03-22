import {ToolConstructable, ToolSettings, BlockToolData} from '../tools';
import {LogLevels, OutputData} from '../index';
import {SanitizerConfig} from './sanitizer-config';

export interface EditorConfig {
  /**
   * Element where Editor will be append
   * @deprecated property will be removed in next major release, use holder instead
   */
  holderId?: string | HTMLElement;

  /**
   * Element where Editor will be append
   */
  holder?: string | HTMLElement;

  /**
   * If true, set caret at the first Block after Editor is ready
   */
  autofocus?: boolean;

  /**
   * Called on block insert, allows for better live collab support.
   * Get after index by using BlockManager.getBlockByUUID(after) then:
   * const index = after + 1;
   * // make sure to have the last argument as true or you'll get a swath of echo events
   * BlockManager.insert(name, data, settings, index, needToFocus, true);
   */
  onInsert?: (after: string | null, data: { name: string, data: object, settings: object, needToFocus: boolean }) => any;

  /**
   * Called on block replace, allows for better live collab support
   * Get block index by using BlockManager.getBlockByUUID(uuid) then:
   * const block = BlockManager.composeBlock(toolName, data);
   * const index = BlockManager.getBlockByUUID(replacing);
   * BlockManager._blocks.insert(index, block, true);
   * // this doesn't need swallow handling because the swallow handler is in a limited API context
   */
  onReplace?: (replacing: string, data: { toolName: string, data: BlockToolData }) => any;

  /**
   * Called on block mutation, allows for better live collab support. this is not debounced.
   * Get block index by using BlockManager.getBlockByUUID(uuid) then you'll need to essentially replace the block with new data
   * const index = BlockManager.getBlockByUUID(uuid);
   * const block = BlockManager.getBlockByIndex(index);
   * const name = block.name;
   * const newBlock = BlockManager.composeBlock(name, data);
   * BlockManager._blocks.insert(index, block, true);
   * // this doesn't need swallow handling because the swallow handler is in a limited API context
   */
  onUpdate?: (mutation: {uuid: string, data: BlockToolData}) => any;

  /**
   * Called on block remove, allows for better live collab support.
   * // make sure to have the last argument as true or you'll get a swath of echo events
   * Get block index by using BlockManager.getBlockByUUID(uuid) then BlockManager.removeBlock(index, true)
   */
  onRemove?: (uuid: string) => any;

  /**
   * Called on blocks swap, just pass the indexes back to the blocks api
   */
  onSwap?: (fromUUID: string, toUUID: string) => any;

  /**
   * Returns true if the event should not be dispatched, preventing echo events from receiving clients
   */
  shouldSwallowUpdate?: (uuid: string, data?: BlockToolData) => Promise<boolean>;

  /**
   * This Tool will be used as default
   * Name should be equal to one of Tool`s keys of passed tools
   * If not specified, Paragraph Tool will be used
   */
  initialBlock?: string;

  /**
   * First Block placeholder
   */
  placeholder?: string|false;

  /**
   * Define default sanitizer configuration
   * @see {@link sanitizer}
   */
  sanitizer?: SanitizerConfig;

  /**
   * If true, toolbar won't be shown
   */
  hideToolbar?: boolean;

  /**
   * Map of Tools to use
   */
  tools?: {[toolName: string]: ToolConstructable|ToolSettings};

  /**
   * Data to render on Editor start
   */
  data?: OutputData;

  /**
   * Height of Editor's bottom area that allows to set focus on the last Block
   */
  minHeight?: number;

  /**
   * Editors log level (how many logs you want to see)
   */
  logLevel?: LogLevels;

  /**
   * Fires when Editor is ready to work
   */
  onReady?(): void;

  /**
   * Fires when something changed in DOM
   */
  onChange?(): void;
}
