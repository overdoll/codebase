/**
 * @generated SignedSource<<fb859ea057e90f69ad4ba6194903ca81>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PublicClubPostsRichObjectFragment$data = {
  readonly banner: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceRichObjectFragment">;
  } | null;
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "PublicClubPostsRichObjectFragment";
};
export type PublicClubPostsRichObjectFragment$key = {
  readonly " $data"?: PublicClubPostsRichObjectFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PublicClubPostsRichObjectFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PublicClubPostsRichObjectFragment",
  "selections": [
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
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "banner",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceRichObjectFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "bf961599f9d6995d53778ce712c9249d";

export default node;
