/**
 * @generated SignedSource<<c0a17ba4b67cfbfa78e362ec11172d93>>
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
    readonly " $fragmentSpreads": FragmentRefs<"ClubThumbnailFragment">;
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
          "name": "ClubThumbnailFragment"
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

(node as any).hash = "4cd85381cbb65c15c08ef327885d26cb";

export default node;
