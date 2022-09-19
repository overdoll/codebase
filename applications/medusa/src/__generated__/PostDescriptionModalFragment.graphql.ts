/**
 * @generated SignedSource<<8cf3428fa66c35842084ab0c55b6411f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostDescriptionModalFragment$data = {
  readonly club: {
    readonly " $fragmentSpreads": FragmentRefs<"ClubIconFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"UpdatePostDescriptionFormFragment">;
  readonly " $fragmentType": "PostDescriptionModalFragment";
};
export type PostDescriptionModalFragment$key = {
  readonly " $data"?: PostDescriptionModalFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostDescriptionModalFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostDescriptionModalFragment",
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
          "name": "ClubIconFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdatePostDescriptionFormFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "ba44e3a84f6575dd646ebe2f077b354a";

export default node;
