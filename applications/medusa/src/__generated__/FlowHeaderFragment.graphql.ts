/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FlowHeaderFragment = {
    readonly post: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"useCheckRequirementsFragment">;
    } | null;
    readonly " $refType": "FlowHeaderFragment";
};
export type FlowHeaderFragment$data = FlowHeaderFragment;
export type FlowHeaderFragment$key = {
    readonly " $data"?: FlowHeaderFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FlowHeaderFragment">;
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
  "name": "FlowHeaderFragment",
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "useCheckRequirementsFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
(node as any).hash = 'c9a89850dc421832044804f86863c336';
export default node;
