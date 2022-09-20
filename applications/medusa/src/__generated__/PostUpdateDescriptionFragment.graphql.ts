/**
 * @generated SignedSource<<38f52291a80e66ffc08e5326cc29b2ec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostUpdateDescriptionFragment$data = {
  readonly club: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ClubIconFragment">;
  };
  readonly description: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostDescriptionHeadingFragment" | "PostDescriptionModalFragment">;
  readonly " $fragmentType": "PostUpdateDescriptionFragment";
};
export type PostUpdateDescriptionFragment$key = {
  readonly " $data"?: PostUpdateDescriptionFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostUpdateDescriptionFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostUpdateDescriptionFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
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
          "name": "id",
          "storageKey": null
        },
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
      "name": "PostDescriptionModalFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostDescriptionHeadingFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "715b13b2138ad747da82974a89121616";

export default node;
