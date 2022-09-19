/**
 * @generated SignedSource<<d8063789aeb49c70c53dae04ffacd400>>
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

(node as any).hash = "7ade9b28a41a03e3c717cb479b9334bc";

export default node;
