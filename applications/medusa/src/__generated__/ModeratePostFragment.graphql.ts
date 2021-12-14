/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ModeratePostFragment = {
    readonly id: string;
    readonly brand: {
        readonly name: string;
    } | null;
    readonly " $refType": "ModeratePostFragment";
};
export type ModeratePostFragment$data = ModeratePostFragment;
export type ModeratePostFragment$key = {
    readonly " $data"?: ModeratePostFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ModeratePostFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ModeratePostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Brand",
      "kind": "LinkedField",
      "name": "brand",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '79f163d814ee8529be4344799eef542b';
export default node;
