/**
 * @generated SignedSource<<2f076a1dcc2b8fb5564c9bbae7bad82f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ModeratePostFragment$data = {
  readonly id: string;
  readonly club: {
    readonly name: string;
  };
  readonly " $fragmentType": "ModeratePostFragment";
};
export type ModeratePostFragment = ModeratePostFragment$data;
export type ModeratePostFragment$key = {
  readonly " $data"?: ModeratePostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ModeratePostFragment">;
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

(node as any).hash = "a4e30de4c2f8f821ce71cea9dbcd4239";

export default node;
