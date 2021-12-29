/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ModeratePostFragment = {
    readonly id: string;
    readonly club: {
        readonly name: string;
    };
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
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
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
(node as any).hash = 'a4e30de4c2f8f821ce71cea9dbcd4239';
export default node;
