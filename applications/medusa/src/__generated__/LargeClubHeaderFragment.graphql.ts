/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LargeClubHeaderFragment = {
    readonly name: string;
    readonly thumbnail: {
        readonly " $fragmentRefs": FragmentRefs<"ResourceIconFragment">;
    } | null;
    readonly " $refType": "LargeClubHeaderFragment";
};
export type LargeClubHeaderFragment$data = LargeClubHeaderFragment;
export type LargeClubHeaderFragment$key = {
    readonly " $data"?: LargeClubHeaderFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"LargeClubHeaderFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LargeClubHeaderFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "thumbnail",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceIconFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};
(node as any).hash = 'dae64c8084b43291d1475f61621a8ba9';
export default node;
