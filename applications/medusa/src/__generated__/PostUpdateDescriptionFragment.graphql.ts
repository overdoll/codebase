/**
 * @generated SignedSource<<8ece5af1ca497f60053e19b6e27fec5a>>
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
    readonly " $fragmentSpreads": FragmentRefs<"ClubThumbnailFragment">;
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
          "name": "ClubThumbnailFragment"
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

(node as any).hash = "14c2842cbae849a9d52b1f247b48e5de";

export default node;
