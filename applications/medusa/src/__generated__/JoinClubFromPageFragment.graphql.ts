/**
 * @generated SignedSource<<0bc12b99041bd8c0db7793a0e92837c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JoinClubFromPageFragment$data = {
  readonly viewerMember: {
    readonly isSupporter: boolean;
  } | null;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"BecomeMemberButtonClubFragment" | "WithdrawMembershipButtonClubFragment">;
  readonly " $fragmentType": "JoinClubFromPageFragment";
};
export type JoinClubFromPageFragment = JoinClubFromPageFragment$data;
export type JoinClubFromPageFragment$key = {
  readonly " $data"?: JoinClubFromPageFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"JoinClubFromPageFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinClubFromPageFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BecomeMemberButtonClubFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "WithdrawMembershipButtonClubFragment"
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "de09fe6c49bfc71e3104c6fd65e359c7";

export default node;
