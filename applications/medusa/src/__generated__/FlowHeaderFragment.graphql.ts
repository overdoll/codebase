/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FlowHeaderFragment = {
    readonly club: {
        readonly " $fragmentRefs": FragmentRefs<"ClubPreviewFragment">;
    };
    readonly " $fragmentRefs": FragmentRefs<"checkPostRequirementsFragment">;
    readonly " $refType": "FlowHeaderFragment";
};
export type FlowHeaderFragment$data = FlowHeaderFragment;
export type FlowHeaderFragment$key = {
    readonly " $data"?: FlowHeaderFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FlowHeaderFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FlowHeaderFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ClubPreviewFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "checkPostRequirementsFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'e0d61b0246b5e828ee0be154417054a9';
export default node;
