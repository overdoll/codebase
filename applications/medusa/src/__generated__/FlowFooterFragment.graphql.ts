/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FlowFooterFragment = {
    readonly post: {
        readonly " $fragmentRefs": FragmentRefs<"FlowForwardButtonFragment">;
    } | null;
    readonly " $refType": "FlowFooterFragment";
};
export type FlowFooterFragment$data = FlowFooterFragment;
export type FlowFooterFragment$key = {
    readonly " $data"?: FlowFooterFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FlowFooterFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "reference"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "FlowFooterFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "reference",
          "variableName": "reference"
        }
      ],
      "concreteType": "Post",
      "kind": "LinkedField",
      "name": "post",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FlowForwardButtonFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
(node as any).hash = 'c25ba774c1fdad32628d3956ac08e6d8';
export default node;
