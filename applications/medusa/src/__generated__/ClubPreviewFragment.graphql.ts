/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ClubPreviewFragment = {
    readonly name: string;
    readonly slug: string;
    readonly thumbnail: {
        readonly " $fragmentRefs": FragmentRefs<"ResourceIconFragment">;
    } | null;
    readonly " $refType": "ClubPreviewFragment";
};
export type ClubPreviewFragment$data = ClubPreviewFragment;
export type ClubPreviewFragment$key = {
    readonly " $data"?: ClubPreviewFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ClubPreviewFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubPreviewFragment",
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
      "kind": "ScalarField",
      "name": "slug",
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
(node as any).hash = '52b7746885336887e2a9080c3a64de69';
export default node;
