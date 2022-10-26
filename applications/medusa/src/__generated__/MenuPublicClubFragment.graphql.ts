/**
 * @generated SignedSource<<9b73e58f6bfd18f77371ff26babbed4b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MenuPublicClubFragment$data = {
  readonly slug: string;
  readonly viewerIsOwner: boolean;
  readonly viewerMember: {
    readonly isSupporter: boolean;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ClubFooterManageSubscriptionButtonFragment">;
  readonly " $fragmentType": "MenuPublicClubFragment";
};
export type MenuPublicClubFragment$key = {
  readonly " $data"?: MenuPublicClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MenuPublicClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MenuPublicClubFragment",
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
      "name": "viewerIsOwner",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubMember",
      "kind": "LinkedField",
      "name": "viewerMember",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isSupporter",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubFooterManageSubscriptionButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "e507279c8c3c1ef7244c7750ef5fccfb";

export default node;
